const express = require('express')
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID пользователя
 *         email:
 *           type: string
 *           description: Электронная почта пользователя
 *         login:
 *           type: string
 *           description: Логин пользователя
 *         role:
 *           type: integer
 *           description: Роль пользователя
 *         registration_date:
 *           type: string
 *           format: date-time
 *           description: Дата регистрации
 *         isApproved:
 *           type: boolean
 *           description: Статус подтверждения пользователя
 *         isBanned:
 *           type: boolean
 *           description: Статус бана пользователя
 *         isOauthProfile:
 *           type: boolean
 *           description: Статус OAuth профиля пользователя
 *       required:
 *         - email
 *         - login
 *         - role
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID профиля пользователя
 *         user_id:
 *           type: string
 *           description: ID пользователя
 *         fio:
 *           type: string
 *           description: ФИО пользователя
 *         phone:
 *           type: string
 *           description: Телефон пользователя
 *         registration_date:
 *           type: string
 *           format: date-time
 *           description: Дата регистрации
 *         photo:
 *           type: string
 *           description: Фото профиля пользователя
 *       required:
 *         - user_id
 *         - fio
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для управления пользователями
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Возвращает список всех пользователей
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Количество записей на страницу
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Электронная почта пользователя
 *       - in: query
 *         name: registration_date
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Дата регистрации
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: boolean
 *         description: Статус подтверждения пользователя
 *       - in: query
 *         name: isBanned
 *         schema:
 *           type: boolean
 *         description: Статус бана пользователя
 *       - in: query
 *         name: isOauthProfile
 *         schema:
 *           type: boolean
 *         description: Статус OAuth профиля пользователя
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         description: Поле для сортировки
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Порядок сортировки (ASC или DESC)
 *     responses:
 *       200:
 *         description: Список всех пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.listAll)

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создает нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка в запросе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', authMiddleware, UserController.create, errorMiddleware)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Возвращает пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', UserController.read)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновляет пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', authMiddleware, UserController.update, errorMiddleware)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удаляет пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       204:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/:id', authMiddleware, UserController.delete, errorMiddleware)

module.exports = router
