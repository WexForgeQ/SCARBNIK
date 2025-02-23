const { User, UserProfile } = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

class UserController {
  async create(req, res) {
    try {
      const user = await User.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json({
        ...user.toJSON(),
        access_token: undefined,
        refresh_token: undefined
      })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async self(req, res) {
    try {
      const cookieHeader = req.headers.cookie
      if (!cookieHeader) {
        return res.status(200).json()
      }

      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=').map((c) => c.trim())
        acc[name] = value
        return acc
      }, {})

      const refresh = cookies.refreshToken
      if (!refresh) {
        return res.status(200).json()
      }

      const userId = jwt.decode(refresh).userId

      const user = await User.findOne({
        where: { id: userId },
        include: [{ model: UserProfile }]
      })
      if (user && user.isBanned) {
        throw ApiError.Unauthorized('Не авторизован')
      }
      if (!user) {
        return res.status(200).json()
      }
      return res.status(200).json({
        ...user.toJSON(),
        access_token: undefined,
        refresh_token: undefined
      })
    } catch (error) {
      return res.status(200).json()
    }
  }

  async read(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: UserProfile }]
      })
      if (!user) {
        throw ApiError.notFound('Пользователь не найден')
      }
      return res.status(200).json({
        ...user.toJSON(),
        access_token: undefined,
        refresh_token: undefined
      })
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        throw ApiError.notFound('Пользователь не найден')
      }
      const updatedUser = await User.findByPk(req.params.id, {
        include: [{ model: UserProfile }]
      })
      return res.status(200).json({
        ...updatedUser.toJSON(),
        access_token: undefined,
        refresh_token: undefined
      })
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      const deleted = await User.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Пользователь не найден')
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async listAll(req, res) {
    const {
      page = 1,
      pageSize = 10,
      email,
      registration_date,
      isApproved,
      isBanned,
      isOauthProfile,
      sortField = 'id',
      sortOrder = 'ASC'
    } = req.query

    const filter = {
      ...(email && { email: { [Op.like]: `%${email}%` } }),
      ...(registration_date && {
        registration_date: { [Op.eq]: registration_date }
      }),
      ...(isApproved && { isApproved: { [Op.eq]: isApproved } }),
      ...(isBanned && { isBanned: { [Op.eq]: isBanned } }),
      ...(isOauthProfile && { isOauthProfile: { [Op.eq]: isOauthProfile } })
    }

    const options = {
      where: filter,
      include: [{ model: UserProfile }],
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: parseInt(pageSize, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10)
    }

    try {
      const { count, rows: users } = await User.findAndCountAll(options)
      return res.status(200).json({ total: count, users })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new UserController()
