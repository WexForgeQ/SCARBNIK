const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const YandexStrategy = require('passport-yandex').Strategy
const { User, UserProfile } = require('../models/models')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')
require('dotenv').config()

passport.serializeUser((user, done) => {
  done(null, user.id)
})

const generateJwt = (email, role) => {
  const access_token = jwt.sign({ email, role }, process.env.SECRET_KEY, {
    expiresIn: 10
  })
  const refresh_token = jwt.sign({ email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h'
  })
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
      try {
        console.log(profile)
        let user = await User.findOne({
          where: { email: profile.emails[0].value }
        })
        const tokenData = generateJwt(profile.emails[0].value, 2)
        if (!user) {
          user = await User.create({
            id: crypto.randomUUID(),
            email: profile.emails[0].value,
            login: profile.displayName,
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            role: 2,
            isApproved: true,
            isOauthProfile: true
          })
          await UserProfile.create({
            id: crypto.randomUUID(),
            user_id: user.id,
            fio: profile.displayName,
            photo: profile.photos[0].value,
            registration_date: sequelize.literal('CURRENT_TIMESTAMP')
          })
        } else {
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
        done(null, user, tokenData) // Передача токенов клиенту
      } catch (err) {
        console.error('Error in strategy:', err)
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
      console.log(profile)
      try {
        const email = profile.emails[0].value
        console.log(profile.emails[0])
        let user = await User.findOne({ where: { email } })
        const tokenData = generateJwt(email, 2)

        if (!user) {
          user = await User.create({
            id: crypto.randomUUID(),
            email,
            login: profile.displayName,
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            role: 2,
            isApproved: true
          })

          await UserProfile.create({
            id: crypto.randomUUID(),
            user_id: user.id,
            fio: profile.displayName,
            photo: profile.photos[0] ? profile.photos[0].value : null,
            registration_date: sequelize.literal('CURRENT_TIMESTAMP')
          })
        } else {
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

        done(null, user, tokenData) // Передача токенов клиенту
      } catch (err) {
        console.error('Error in strategy:', err)
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
