const express = require('express')
const ItemRequestController = require('../controllers/itemRequestController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()
const multer = require('multer')
/**
 * @swagger
 * components:
 *   schemas:
 *     ItemRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID запроса на предмет
 *         item_title:
 *           type: string
 *           description: Название предмета
 *         request_description:
 *           type: string
 *           description: Описание запроса
 *         request_photo:
 *           type: string
 *           description: Фото запроса
 *         category_id:
 *           type: string
 *           description: ID категории
 *       required:
 *         - item_title
 *         - request_description
 *         - request_photo
 *         - category_id
 */

/**
 * @swagger
 * tags:
 *   name: ItemRequests
 *   description: API для управления запросами на предметы
 */

/**
 * @swagger
 * /api/itemrequests:
 *   get:
 *     summary: Возвращает список всех запросов на предметы
 *     tags: [ItemRequests]
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
 *         name: item_title
 *         schema:
 *           type: string
 *         description: Название предмета
 *       - in: query
 *         name: request_description
 *         schema:
 *           type: string
 *         description: Описание запроса
 *       - in: query
 *         name: request_photo
 *         schema:
 *           type: string
 *         description: Фото запроса
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: ID категории
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
 *         description: Список всех запросов на предметы
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemRequest'
 */
router.get('/', ItemRequestController.listAll)

/**
 * @swagger
 * /api/itemrequests:
 *   post:
 *     summary: Создает новый запрос на предмет
 *     tags: [ItemRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemRequest'
 *     responses:
 *       201:
 *         description: Запрос на предмет успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemRequest'
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
const upload = multer({ storage: multer.memoryStorage() })
router.post(
  '/',
  authMiddleware,
  upload.single('item_photo'),
  ItemRequestController.create,
  errorMiddleware
)

router.patch(
  '/response',
  authMiddleware,
  ItemRequestController.requestResponse,
  errorMiddleware
)
/**
 * @swagger
 * /api/itemrequests/{id}:
 *   get:
 *     summary: Возвращает запрос на предмет по ID
 *     tags: [ItemRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID запроса на предмет
 *     responses:
 *       200:
 *         description: Данные запроса на предмет
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemRequest'
 *       404:
 *         description: Запрос на предмет не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', ItemRequestController.read)

/**
 * @swagger
 * /api/itemrequests/{id}:
 *   put:
 *     summary: Обновляет запрос на предмет по ID
 *     tags: [ItemRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID запроса на предмет
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemRequest'
 *     responses:
 *       200:
 *         description: Запрос на предмет успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemRequest'
 *       404:
 *         description: Запрос на предмет не найден
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
  upload.single('item_photo'),
  ItemRequestController.update,
  errorMiddleware
)

/**
 * @swagger
 * /api/itemrequests/{id}:
 *   delete:
 *     summary: Удаляет запрос на предмет по ID
 *     tags: [ItemRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID запроса на предмет
 *     responses:
 *       204:
 *         description: Запрос на предмет успешно удален
 *       404:
 *         description: Запрос на предмет не найден
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
  ItemRequestController.delete,
  errorMiddleware
)

module.exports = router
