const express = require('express')
const RefreshController = require('../controllers/refreshController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     TokenRefresh:
 *       type: object
 *       properties:
 *         refresh_token:
 *           type: string
 *           description: Токен обновления
 *       required:
 *         - refresh_token
 *     Tokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Токен доступа
 *         refreshToken:
 *           type: string
 *           description: Токен обновления
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API для аутентификации и управления токенами
 */

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Обновляет токены доступа и обновления
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenRefresh'
 *     responses:
 *       200:
 *         description: Токены успешно обновлены
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 *       400:
 *         description: Токен обновления не предоставлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Не авторизован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.post('/', RefreshController.refresh, errorMiddleware)

module.exports = router
