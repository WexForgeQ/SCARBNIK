const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, UserProfile, GenerationKey } = require('../models/models')
const { access } = require('fs')
const ApiError = require('../errors/ApiError')
const sequelize = require('../db')
const nodemailer = require('nodemailer')
const { response } = require('express')
const e = require('express')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'alltransbatura@gmail.com',
    pass: 'gpdfozzaxvohzqmi'
  }
})

const generateJwt = (email, role) => {
  const access_token = jwt.sign({ email, role }, process.env.SECRET_KEY, {
    expiresIn: 10
  })
  const refresh_token = jwt.sign({ email, role }, process.env.SECRET_KEY, {
    expiresIn: '7d'
  })
  const data = { access_token, refresh_token }
  return data
}

const generateVerificationToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.SECRET_KEY, {
    expiresIn: '24h'
  })
}

class AuthController {
  async registration(req, res, next) {
    try {
      const { email, login, password } = req.body
      const hashPassword = await bcrypt.hash(password, 2)
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return next(
          ApiError.badRequest('Пользователь с таким email уже существует.')
        )
      }
      const candidate2 = await User.findOne({ where: { login } })
      if (candidate2) {
        return next(
          ApiError.badRequest('Пользователь с таким логином уже существует.')
        )
      }
      const user = await User.create({
        id: crypto.randomUUID(),
        email,
        login: login,
        password: hashPassword,
        role: 2
      })
      await UserProfile.create({
        id: crypto.randomUUID(),
        user_id: user.id,
        fio: 'default',
        phone: 'default',
        registration_date: sequelize.literal('CURRENT_TIMESTAMP')
      })

      const verificationToken = generateVerificationToken(email, user.id)
      const verificationLink = `https://localhost:5000/api/auth/verify-email?token=${verificationToken}`
      const mailOptions = {
        from: 'alltransbatura@gmail.com',
        to: email,
        subject: 'Подтверждение регистрации',
        html: `<h1>Подтверждение регистрации</h1><p>Перейдите по <a href="${verificationLink}">ссылке</a> для подтверждения регистрации.</p>`
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return next(ApiError.internal('Ошибка отправки письма'))
        }
        return res
          .status(200)
          .json({ message: 'Письмо отправлено для подтверждения регистрации.' })
      })
    } catch (error) {
      console.log(error)
      return next(ApiError.internal('Внутренняя ошибка'))
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query
      const decoded = jwt.verify(token, process.env.SECRET_KEY)

      const user = await User.findOne({
        where: { id: decoded.userId, email: decoded.email }
      })
      console.log(user)
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден.'))
      }
      await User.update(
        {
          isApproved: true
        },
        { where: { id: user.id } }
      )
      return res.redirect('http://localhost:3000/auth/email-verification')
    } catch (error) {
      return next(
        ApiError.badRequest('Неверная или истекшая ссылка подтверждения.')
      )
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'))
      }
      if (!user.isApproved) {
        return next(ApiError.badRequest('Аккаунт не подтвержден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.badRequest('Неверный пароль'))
      }
      const tokenData = generateJwt(email, 2)

      await User.update(
        {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token
        },
        {
          where: {
            id: user.id
          }
        }
      )

      res.cookie('accessToken', tokenData.access_token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      })

      res.cookie('refreshToken', tokenData.refresh_token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      })

      console.log(res)
      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return next(ApiError.internal('Внутренняя ошибка'))
    }
  }

  async logout(req, res, next) {
    try {
      const { access } = req.body
      const user = await User.findOne({ where: { access_token: access } })
      if (!user) {
        return next(ApiError.Unauthorized('Не залогинен'))
      } else {
        await User.update(
          { access_token: null, refresh_token: null },
          {
            where: { access_token: access }
          }
        )
        res.status(200).json(access)
      }
    } catch (error) {
      return next(ApiError.internal('Внутренняя ошибка'))
    }
  }

  async getRole(req, res, next) {
    const { access } = req.query
    const user = await User.findOne({ where: { access_token: access } })
    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'))
    } else {
      res.status(200).json({ role: user.role })
    }
  }
}

module.exports = new AuthController()
