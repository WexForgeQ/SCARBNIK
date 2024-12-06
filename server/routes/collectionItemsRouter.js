const express = require('express')
const CollectionItemController = require('../controllers/collectionItemsController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const Router = require('express')
const router = new Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     CollectionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID элемента коллекции
 *         collection_id:
 *           type: string
 *           description: ID коллекции
 *         item_id:
 *           type: string
 *           description: ID предмета
 *       required:
 *         - collection_id
 *         - item_id
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
 *   name: CollectionItems
 *   description: API для управления элементами коллекции
 */

/**
 * @swagger
 * /api/collectionitems:
 *   post:
 *     summary: Создает новый элемент коллекции
 *     tags: [CollectionItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollectionItem'
 *     responses:
 *       201:
 *         description: Элемент коллекции успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollectionItem'
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
  CollectionItemController.create,
  errorMiddleware
)

/**
 * @swagger
 * /api/collectionitems/{id}:
 *   get:
 *     summary: Возвращает элемент коллекции по ID
 *     tags: [CollectionItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID элемента коллекции
 *     responses:
 *       200:
 *         description: Данные элемента коллекции
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollectionItem'
 *       404:
 *         description: Элемент коллекции не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', CollectionItemController.read)

/**
 * @swagger
 * /api/collectionitems/{id}:
 *   put:
 *     summary: Обновляет элемент коллекции по ID
 *     tags: [CollectionItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID элемента коллекции
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CollectionItem'
 *     responses:
 *       200:
 *         description: Элемент коллекции успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollectionItem'
 *       404:
 *         description: Элемент коллекции не найден
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
  CollectionItemController.update,
  errorMiddleware
)

/**
 * @swagger
 * /api/collectionitems/{id}:
 *   delete:
 *     summary: Удаляет элемент коллекции по ID
 *     tags: [CollectionItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID элемента коллекции
 *     responses:
 *       204:
 *         description: Элемент коллекции успешно удален
 *       404:
 *         description: Элемент коллекции не найден
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
  CollectionItemController.delete,
  errorMiddleware
)

/**
 * @swagger
 * /api/collectionitems/{collectionId}/items:
 *   get:
 *     summary: Возвращает все элементы для данной коллекции
 *     tags: [CollectionItems]
 *     parameters:
 *       - in: path
 *         name: collectionId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID коллекции
 *     responses:
 *       200:
 *         description: Список всех элементов коллекции
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CollectionItem'
 */
router.get('/:collectionId/items', CollectionItemController.getAllItems)

/**
 * @swagger
 * /api/collectionitems/additem:
 *   post:
 *     summary: Добавляет предмет в коллекцию
 *     tags: [CollectionItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collectionId:
 *                 type: string
 *               itemId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Предмет успешно добавлен в коллекцию
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollectionItem'
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
  '/additem',
  authMiddleware,
  CollectionItemController.addItem,
  errorMiddleware
)

/**
 * @swagger
 * /api/collectionitems/removeitem:
 *   delete:
 *     summary: Удаляет предмет из коллекции
 *     tags: [CollectionItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collectionId:
 *                 type: string
 *               itemId:
 *                 type: string
 *     responses:
 *       204:
 *         description: Предмет успешно удален из коллекции
 *       404:
 *         description: Элемент коллекции не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete(
  '/removeitem',
  authMiddleware,
  CollectionItemController.removeItem,
  errorMiddleware
)

module.exports = router
