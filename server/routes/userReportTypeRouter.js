const express = require('express')
const UserReportTypeController = require('../controllers/userReportTypeController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReportType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID типа жалобы
 *         title:
 *           type: string
 *           description: Название типа жалобы
 *       required:
 *         - title
 */

/**
 * @swagger
 * tags:
 *   name: UserReportTypes
 *   description: API для управления типами жалоб пользователей
 */

/**
 * @swagger
 * /api/userreporttypes:
 *   get:
 *     summary: Возвращает список всех типов жалоб
 *     tags: [UserReportTypes]
 *     responses:
 *       200:
 *         description: Список всех типов жалоб
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserReportType'
 */
router.get('/', UserReportTypeController.listAll)

/**
 * @swagger
 * /api/userreporttypes:
 *   post:
 *     summary: Создает новый тип жалобы
 *     tags: [UserReportTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReportType'
 *     responses:
 *       201:
 *         description: Тип жалобы успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReportType'
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
router.post(
  '/',
  authMiddleware,
  UserReportTypeController.create,
  errorMiddleware
)

/**
 * @swagger
 * /api/userreporttypes/{id}:
 *   get:
 *     summary: Возвращает тип жалобы по ID
 *     tags: [UserReportTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID типа жалобы
 *     responses:
 *       200:
 *         description: Данные типа жалобы
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReportType'
 *       404:
 *         description: Тип жалобы не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', UserReportTypeController.read)

/**
 * @swagger
 * /api/userreporttypes/{id}:
 *   put:
 *     summary: Обновляет тип жалобы по ID
 *     tags: [UserReportTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID типа жалобы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserReportType'
 *     responses:
 *       200:
 *         description: Тип жалобы успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReportType'
 *       404:
 *         description: Тип жалобы не найден
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
  UserReportTypeController.update,
  errorMiddleware
)

/**
 * @swagger
 * /api/userreporttypes/{id}:
 *   delete:
 *     summary: Удаляет тип жалобы по ID
 *     tags: [UserReportTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID типа жалобы
 *     responses:
 *       204:
 *         description: Тип жалобы успешно удален
 *       404:
 *         description: Тип жалобы не найден
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
  UserReportTypeController.delete,
  errorMiddleware
)

module.exports = router
