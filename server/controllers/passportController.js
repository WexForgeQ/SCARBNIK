const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const YandexStrategy = require('passport-yandex').Strategy
const { User, UserProfile } = require('../models/models')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')
const ApiError = require('../errors/ApiError')
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

const generateJwt = (email, role, userId) => {
  const access_token = jwt.sign(
    { email, role, userId },
    process.env.SECRET_KEY,
    {
      expiresIn: '1h'
    }
  )
  const refresh_token = jwt.sign(
    { email, role, userId },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h'
    }
  )
  const data = { access_token, refresh_token }
  return data
}

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: 'https://localhost:5000/api/auth/google/callback'
    },
    async (access_token, tokens, profile, done) => {
      let tokenData
      try {
        let user = await User.findOne({
          where: { email: profile.emails[0].value }
        })
        if (!user) {
          let user = await User.create({
            id: crypto.randomUUID(),
            email: profile.emails[0].value,
            login: profile.displayName,
            role: 2,
            isApproved: true,
            isOauthProfile: true
          })
          tokenData = generateJwt(profile.emails[0].value, 2, user.id)
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
          await UserProfile.create({
            id: crypto.randomUUID(),
            user_id: user.id,
            fio: profile.displayName,
            photo: profile.photos[0].value,
            registration_date: sequelize.literal('CURRENT_TIMESTAMP')
          })
        } else {
          tokenData = generateJwt(profile.emails[0].value, 2, user.id)
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
          await UserProfile.update(
            {
              fio: profile.displayName,
              photo: profile.photos[0].value
            },
            {
              where: {
                user_id: user.id
              }
            }
          )
        }
        done(null, user, tokenData)
      } catch (err) {
        ApiError.badRequest('Ошибка:', err)
        done(err)
      }
    }
  )
)

passport.use(
  new YandexStrategy(
    {
      clientID: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_SECRET_KEY,
      callbackURL: 'https://localhost:5000/api/auth/yandex/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      let tokenData
      try {
        const email = profile.emails[0].value
        let user = await User.findOne({ where: { email } })
        if (!user) {
          user = await User.create({
            id: crypto.randomUUID(),
            email,
            login: profile.displayName,
            role: 2,
            isApproved: true,
            isOauthProfile: true
          })
          tokenData = generateJwt(profile.emails[0].value, 2, user.id)
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
          await UserProfile.create({
            id: crypto.randomUUID(),
            user_id: user.id,
            fio: profile.displayName,
            photo: profile.photos[0] ? profile.photos[0].value : null,
            registration_date: sequelize.literal('CURRENT_TIMESTAMP')
          })
        } else {
          tokenData = generateJwt(profile.emails[0].value, 2, user.id)
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

          await UserProfile.update(
            {
              fio: profile.displayName,
              photo: profile.photos[0] ? profile.photos[0].value : null
            },
            {
              where: {
                user_id: user.id
              }
            }
          )
        }

        done(null, user, tokenData)
      } catch (err) {
        console.log(err)
        ApiError.badRequest('Ошибка:', err)
        done(err)
      }
    }
  )
)

// // Telegram Strategy
// passport.use(
//   new TelegramStrategy(
//     {
//       botToken: process.env.TELEGRAM_BOT_TOKEN
//     },
//     async (profile, done) => {
//       try {
//         let user = await User.findOne({ where: { id: profile.id } })
//         if (!user) {
//           user = await User.create({
//             id: profile.id,
//             email: `${profile.username}@telegram.com`, // Telegram не предоставляет email, используйте username
//             login: profile.username,
//             role: 2,
//             isApproved: true
//           })
//           await UserProfile.create({
//             user_id: user.id,
//             fio: profile.first_name + ' ' + profile.last_name,
//             photo: profile.photo_url,
//             registration_date: sequelize.literal('CURRENT_TIMESTAMP')
//           })
//         }
//         done(null, user)
//       } catch (err) {
//         done(err)
//       }
//     }
//   )
// )

module.exports = passport
