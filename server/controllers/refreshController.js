const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const { User } = require('../models/models')

const generateJwt = (email, role, userId) => {
  const accessToken = jwt.sign(
    { email, role, userId },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h'
    }
  )
  const refreshToken = jwt.sign(
    { email, role, userId },
    process.env.SECRET_KEY,
    {
      expiresIn: '7d'
    }
  )
  const data = { accessToken, refreshToken }
  return data
}

class RefreshController {
  async refresh(req, res) {
    const cookieHeader = req.headers.cookie
    if (!cookieHeader) {
      res.clearCookie('accessToken', { httpOnly: true, secure: true })
      res.clearCookie('refreshToken', { httpOnly: true, secure: true })
      return res.status(404).json({ message: 'Не авторизован' })
    }
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=').map((c) => c.trim())
      acc[name] = value
      return acc
    }, {})

    const token = cookies.refreshToken

    if (!token || token === ' ') {
      res.clearCookie('accessToken', { httpOnly: true, secure: true })
      res.clearCookie('refreshToken', { httpOnly: true, secure: true })
      return res.status(404).json({ message: 'Не авторизован' })
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const user = await User.findByPk(decoded.userId)
      console.log(user)
      if (!user || user.refresh_token !== token || user.isBanned) {
        throw ApiError.Unauthorized('Не авторизован')
      }

      const tokens = generateJwt(user.email, user.role, user.id)
      user.refresh_token = tokens.refreshToken
      user.access_token = tokens.accessToken
      await user.save()

      res.cookie('accessToken', tokens.accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      })

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
      })

      return res.status(200).json(tokens)
    } catch (error) {
      res.clearCookie('accessToken', { httpOnly: true, secure: true })
      res.clearCookie('refreshToken', { httpOnly: true, secure: true })
      return res
        .status(404)
        .json({ message: 'Не авторизован', error: error.message })
    }
  }
}

module.exports = new RefreshController()
