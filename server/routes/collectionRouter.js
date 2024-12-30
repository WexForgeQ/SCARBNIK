const express = require('express')
const CollectionController = require('../controllers/collectionController')
const errorMiddleware = require('../middleware/errorMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID коллекции
 *         title:
 *           type: string
 *           description: Название коллекции
 *         category_id:
 *           type: string
 *           description: ID категории
 *       required:
 *         - title
 *         - category_id
 *     CollectionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID элемента коллекции
 *         item_id:
 *           type: string
 *           description: ID предмета
 *         collection_id:
 *           type: string
 *           description: ID коллекции
 *       required:
 *         - item_id
 *         - collection_id
 */

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: API для управления коллекциями
 */

/**
 * @swagger
 * /api/collections:
 *   get:
 *     summary: Возвращает список всех коллекций
 *     tags: [Collections]
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
 *         name: title
 *         schema:
 *           type: string
 *         description: Название коллекции
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Тип коллекции
 *     responses:
 *       200:
 *         description: Список всех коллекций
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 */
router.get('/', CollectionController.getAll, errorMiddleware)

/**
 * @swagger
 * /api/collections:
 *   post:
 *     summary: Создает новую коллекцию
 *     tags: [Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       201:
 *         description: Коллекция успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
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
router.post('/', authMiddleware, CollectionController.create, errorMiddleware)
router.post(
  '/rate',
  authMiddleware,
  CollectionController.rateCollection,
  errorMiddleware
)
router.delete(
  '/rate',
  authMiddleware,
  CollectionController.deleteRating,
  errorMiddleware
)
/**
 * @swagger
 * /api/collections/{id}:
 *   get:
 *     summary: Возвращает коллекцию по ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коллекции
 *     responses:
 *       200:
 *         description: Данные коллекции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       404:
 *         description: Коллекция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', CollectionController.read, errorMiddleware)

/**
 * @swagger
 * /api/collections/{id}:
 *   put:
 *     summary: Обновляет коллекцию по ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коллекции
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       200:
 *         description: Коллекция успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       404:
 *         description: Коллекция не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', authMiddleware, CollectionController.update, errorMiddleware)

/**
 * @swagger
 * /api/collections/{id}:
 *   delete:
 *     summary: Удаляет коллекцию по ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коллекции
 *     responses:
 *       204:
 *         description: Коллекция успешно удалена
 *       404:
 *         description: Коллекция не найдена
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
  CollectionController.delete,
  errorMiddleware
)

module.exports = router
