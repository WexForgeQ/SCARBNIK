const Router = require('express')
const authController = require('../controllers/authController')
const router = new Router()
const passport = require('../controllers/passportController') // Google OAuth
const cors = require('cors')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')

const corsOptions = {
  origin: 'https://localhost:3000', // Замените на ваш домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin'
  ]
}

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Авторизация через Google
 *     tags: [OAuth]
 *     responses:
 *       302:
 *         description: Перенаправление на страницу авторизации Google
 */
router.get(
  '/google',
  cors(corsOptions),
  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email']
    },
    errorMiddleware
  )
)

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Обработка ответа от Google
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: Авторизация прошла успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     login:
 *                       type: string
 *                     role:
 *                       type: integer
 *                     isApproved:
 *                       type: boolean
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       401:
 *         description: Ошибка авторизации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get(
  '/google/callback',
  cors(corsOptions),
  passport.authenticate('google', {
    failureRedirect: 'https://localhost:3000/auth/login'
  }),
  errorMiddleware,
  (req, res) => {
    const { user, access_token, refresh_token } = req.user
    res.cookie('accessToken', access_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
    })
    res.cookie('refreshToken', refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
    })
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000')
    res.redirect('https://localhost:3000/')
  }
)

/**
 * @swagger
 * /api/auth/yandex:
 *   get:
 *     summary: Авторизация через Yandex
 *     tags: [OAuth]
 *     responses:
 *       302:
 *         description: Перенаправление на страницу авторизации Yandex
 */
router.get(
  '/yandex',
  cors(corsOptions),
  passport.authenticate('yandex'),
  errorMiddleware
)

/**
 * @swagger
 * /api/auth/yandex/callback:
 *   get:
 *     summary: Обработка ответа от Yandex
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: Авторизация прошла успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     login:
 *                       type: string
 *                     role:
 *                       type: integer
 *                     isApproved:
 *                       type: boolean
 *                 access_token:
 *                   type: string
 *                 refresh_token:
 *                   type: string
 *       401:
 *         description: Ошибка авторизации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get(
  '/yandex/callback',
  cors(corsOptions),
  passport.authenticate('yandex', {
    failureRedirect: '/login'
  }),
  errorMiddleware,
  (req, res) => {
    const { user, access_token, refresh_token } = req.user
    res.cookie('accessToken', access_token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
    })
    res.cookie('refreshToken', refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
    })
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000')
    res.redirect('https://localhost:3000/')
  }
)

/**
 * @swagger
 * /api/auth/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration email sent
 *       400:
 *         description: Bad request - User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/registration', authController.registration, errorMiddleware)

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     summary: Verify email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                     refresh_token:
 *                       type: string
 *                 userid:
 *                   type: string
 *                 role:
 *                   type: integer
 *       400:
 *         description: Invalid or expired verification link
 *       500:
 *         description: Internal server error
 */
router.get('/verify-email', authController.verifyEmail, errorMiddleware)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokenData:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                     refresh_token:
 *                       type: string
 *                 userid:
 *                   type: string
 *                 role:
 *                   type: integer
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login, errorMiddleware)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     description: Логаут пользователя, очищает токены доступа и обновления из куки и базы данных.
 *     operationId: logoutUser
 *     responses:
 *       '200':
 *         description: Успешный выход из системы
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Вы успешно вышли из системы"
 *       '401':
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Не залогинен"
 *       '500':
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Внутренняя ошибка"
 *     security:
 *       - cookieAuth: []
 */

router.post('/logout', authMiddleware, authController.logout, errorMiddleware)

/**
 * @swagger
 * /api/auth/getRole:
 *   get:
 *     summary: Get user role
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: AccessToken
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: integer
 *       400:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/getRole', authMiddleware, authController.getRole, errorMiddleware)

module.exports = router
