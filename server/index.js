const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
const fs = require('fs')
const https = require('https')
const { sequelize, User, UserProfile } = require('./models/models')
const { DataTypes } = require('sequelize')
const router = require('./routes/index')
const swaggerSetup = require('./swagger')
const session = require('express-session')
const passport = require('./controllers/passportController')

async function createAdminUser() {
  const userExists = await User.findOne({ where: { login: 'admin' } })
  const hashPassword = await bcrypt.hash('admin', 2)
  if (!userExists) {
    await User.create({
      id: 'admin',
      email: 'admin@gmail.com',
      login: 'admin',
      password: hashPassword,
      role: 1,
      isApproved: true
    })
    await UserProfile.create({
      id: 'adimn',
      user_id: 'admin',
      fio: 'Admin',
      phone: '+375336061382',
      registration_date: sequelize.literal('CURRENT_TIMESTAMP')
    })
  }
}

app.use(
  cors({
    origin: 'https://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials'
    ]
  })
)

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
)

app.use(express.json({ limit: '50mb' })) // Увеличьте лимит до 50mb или другого нужного значения
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Ваши маршруты и другие middleware

const SSL_KEY_PATH = './credentials/server.key'
const SSL_CERT_PATH = './credentials/server.crt'

const PORT = 5000

const options = {
  key: fs.readFileSync(SSL_KEY_PATH),
  cert: fs.readFileSync(SSL_CERT_PATH)
}
swaggerSetup(app)

app.use(passport.initialize())
app.use(passport.session())
app.use('/api', router)

const startserver = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    await createAdminUser()
    const httpsServer = https.createServer(options, app)
    // app.listen(PORT, () => {
    //   console.log('HTTP Server is running on port', PORT)
    // })
    httpsServer.listen(PORT, (err) => {
      if (err) {
        console.log(err)
      }
      const server = httpsServer.address()
      console.log('HTTPS Server is running on port', PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

startserver()
