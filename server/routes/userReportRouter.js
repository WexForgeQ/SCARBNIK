const express = require('express')
const UserReportController = require('../controllers/userReportController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReport:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID жалобы пользователя
 *         user_id:
 *           type: string
 *           description: ID пользователя
 *         report_type_id:
 *           type: string
 *           description: ID типа жалобы
 *         report_date:
 *           type: string
 *           format: date-time
 *           description: Дата жалобы
 *         description:
 *           type: string
 *           description: Описание жалобы
 *       required:
 *         - user_id
 *         - report_type_id
 *         - report_date
 *         - description
 */

/**
 * @swagger
 * tags:
 *   name: UserReports
 *   description: API для управления жалобами пользователей
 */

/**
 * @swagger
 * /api/userreports:
 *   get:
 *     summary: Возвращает список всех жалоб пользователей
 *     tags: [UserReports]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество записей на страницу
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: ID пользователя
 *       - in: query
 *         name: report_type_id
 *         schema:
 *           type: string
 *         description: ID типа жалобы
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Начальная дата
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Конечная дата
 *     responses:
 *       200:
 *         description: Список всех жалоб пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserReport'
 */
router.get('/', UserReportController.getAll)

/**
 * @swagger
 * /api/userreports:
 *   post:
 *     summary: Создает новую жалобу пользователя
 *     tags: [UserReports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReport'
 *     responses:
 *       201:
 *         description: Жалоба пользователя успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReport'
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
router.post('/', authMiddleware, UserReportController.create, errorMiddleware)

/**
 * @swagger
 * /api/userreports/{id}:
 *   get:
 *     summary: Возвращает жалобу пользователя по ID
 *     tags: [UserReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID жалобы пользователя
 *     responses:
 *       200:
 *         description: Данные жалобы пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReport'
 *       404:
 *         description: Жалоба пользователя не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', UserReportController.read)

/**
 * @swagger
 * /api/userreports/{id}:
 *   put:
 *     summary: Обновляет жалобу пользователя по ID
 *     tags: [UserReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID жалобы пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReport'
 *     responses:
 *       200:
 *         description: Жалоба пользователя успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReport'
 *       404:
 *         description: Жалоба пользователя не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', authMiddleware, UserReportController.update, errorMiddleware)

/**
 * @swagger
 * /api/userreports/{id}:
 *   delete:
 *     summary: Удаляет жалобу пользователя по ID
 *     tags: [UserReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID жалобы пользователя
 *     responses:
 *       204:
 *         description: Жалоба пользователя успешно удалена
 *       404:
 *         description: Жалоба пользователя не найдена
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
  UserReportController.delete,
  errorMiddleware
)

module.exports = router
