const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const { User } = require('../models/models')

class RefreshController {
  generateTokens(user) {
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '30d' }
    )
    return { accessToken, refreshToken }
  }

  async refresh(req, res) {
    const refreshToken = req.body.refresh_token

    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: 'Токен обновления не предоставлен' })
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY)
      const user = await User.findByPk(decoded.id)

      if (!user || user.refresh_token !== refreshToken) {
        throw ApiError.Unauthorized('Не авторизован')
      }

      const tokens = this.generateTokens(user)
      user.refresh_token = tokens.refreshToken
      user.access_token = tokens.accessToken
      await user.save()

      return res.status(200).json(tokens)
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Не авторизован', error: error.message })
    }
  }
}

module.exports = new RefreshController()
