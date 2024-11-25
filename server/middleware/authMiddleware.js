const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token === null) {
      return res.status(400).json({ message: 'Не авторизован' })
    }
    if (token === ' ') {
      return res.status(400).json({ message: 'Не авторизован' })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' })
  }
}
