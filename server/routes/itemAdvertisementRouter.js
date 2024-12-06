const express = require('express')
const ItemAdvertisementController = require('../controllers/itemAdvertisementController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemAdvertisement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID объявления на предмет
 *         item_id:
 *           type: string
 *           description: ID предмета
 *         user_id:
 *           type: string
 *           description: ID пользователя
 *         advertisement_description:
 *           type: string
 *           description: Описание объявления
 *         category_id:
 *           type: string
 *           description: ID категории
 *       required:
 *         - item_id
 *         - user_id
 *         - advertisement_description
 *         - category_id
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID предмета
 *         name:
 *           type: string
 *           description: Название предмета
 *       required:
 *         - name
 */

/**
 * @swagger
 * tags:
 *   name: ItemAdvertisements
 *   description: API для управления объявлениями на предметы
 */

/**
 * @swagger
 * /api/itemadvertisements:
 *   get:
 *     summary: Возвращает список всех объявлений на предметы
 *     tags: [ItemAdvertisements]
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
 *         name: item_id
 *         schema:
 *           type: string
 *         description: ID предмета
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: ID пользователя
 *       - in: query
 *         name: advertisement_description
 *         schema:
 *           type: string
 *         description: Описание объявления
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
 *         description: Список всех объявлений на предметы
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemAdvertisement'
 */
router.get('/', ItemAdvertisementController.listAll)

/**
 * @swagger
 * /api/itemadvertisements:
 *   post:
 *     summary: Создает новое объявление на предмет
 *     tags: [ItemAdvertisements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemAdvertisement'
 *     responses:
 *       201:
 *         description: Объявление на предмет успешно создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemAdvertisement'
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
  ItemAdvertisementController.create,
  errorMiddleware
)

/**
 * @swagger
 * /api/itemadvertisements/{id}:
 *   get:
 *     summary: Возвращает объявление на предмет по ID
 *     tags: [ItemAdvertisements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID объявления на предмет
 *     responses:
 *       200:
 *         description: Данные объявления на предмет
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemAdvertisement'
 *       404:
 *         description: Объявление на предмет не найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', ItemAdvertisementController.read)

/**
 * @swagger
 * /api/itemadvertisements/{id}:
 *   put:
 *     summary: Обновляет объявление на предмет по ID
 *     tags: [ItemAdvertisements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID объявления на предмет
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemAdvertisement'
 *     responses:
 *       200:
 *         description: Объявление на предмет успешно обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemAdvertisement'
 *       404:
 *         description: Объявление на предмет не найдено
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
  ItemAdvertisementController.update,
  errorMiddleware
)

/**
 * @swagger
 * /api/itemadvertisements/{id}:
 *   delete:
 *     summary: Удаляет объявление на предмет по ID
 *     tags: [ItemAdvertisements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID объявления на предмет
 *     responses:
 *       204:
 *         description: Объявление на предмет успешно удалено
 *       404:
 *         description: Объявление на предмет не найдено
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
  ItemAdvertisementController.delete,
  errorMiddleware
)

module.exports = router
