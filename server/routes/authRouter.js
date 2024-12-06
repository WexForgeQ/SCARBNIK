const Router = require('express')
const authController = require('../controllers/authController')
const router = new Router()
const passport = require('../controllers/passportController') // Google OAuth
const cors = require('cors')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')

const corsOptions = {
  origin: 'https://localhost:5000', // Замените на ваш домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
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
    failureRedirect: '/login'
  }),
  errorMiddleware,
  (req, res) => {
    // Возвращаем токены и данные пользователя на клиент
    const { user, access_token, refresh_token } = req.user
    res.json({ user, access_token, refresh_token })
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
    res.json({ user, access_token, refresh_token })
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               access:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: User not logged in
 *       500:
 *         description: Internal server error
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
