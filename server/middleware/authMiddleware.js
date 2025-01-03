const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const cookieHeader = req.headers.cookie
    if (!cookieHeader) {
      return res.status(401).json({ message: 'Не авторизован' })
    }
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=').map((c) => c.trim())
      acc[name] = value
      return acc
    }, {})
    const token = cookies.accessToken
    if (!token || token === ' ') {
      return res.status(401).json({ message: 'Не авторизован' })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' })
  }
}
