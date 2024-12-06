const express = require('express')
const UserProfileController = require('../controllers/userProfilesController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

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
 *   name: UserProfiles
 *   description: API для управления профилями пользователей
 */

/**
 * @swagger
 * /api/userprofiles:
 *   post:
 *     summary: Создает новый профиль пользователя
 *     tags: [UserProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       201:
 *         description: Профиль пользователя успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
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
router.post('/', authMiddleware, UserProfileController.create, errorMiddleware)

/**
 * @swagger
 * /api/userprofiles/{id}:
 *   get:
 *     summary: Возвращает профиль пользователя по ID
 *     tags: [UserProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID профиля пользователя
 *     responses:
 *       200:
 *         description: Данные профиля пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Профиль пользователя не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', UserProfileController.read)

/**
 * @swagger
 * /api/userprofiles/{id}:
 *   put:
 *     summary: Обновляет профиль пользователя по ID
 *     tags: [UserProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID профиля пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Профиль пользователя успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: Профиль пользователя не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put(
  '/:id',
  authMiddleware,
  UserProfileController.update,
  errorMiddleware
)

/**
 * @swagger
 * /api/userprofiles/{id}:
 *   delete:
 *     summary: Удаляет профиль пользователя по ID
 *     tags: [UserProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID профиля пользователя
 *     responses:
 *       204:
 *         description: Профиль пользователя успешно удален
 *       404:
 *         description: Профиль пользователя не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete(
  '/:id',
  authMiddleware,
  UserProfileController.delete,
  errorMiddleware
)

module.exports = router
