const express = require('express')
const ItemController = require('../controllers/itemController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()
const multer = require('multer')
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID предмета
 *         name:
 *           type: string
 *           description: Название предмета
 *         owner_id:
 *           type: string
 *           description: ID владельца
 *       required:
 *         - name
 *         - owner_id
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API для управления предметами
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Возвращает список всех предметов
 *     tags: [Items]
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
 *         name: name
 *         schema:
 *           type: string
 *         description: Название предмета
 *       - in: query
 *         name: owner_id
 *         schema:
 *           type: string
 *         description: ID владельца
 *     responses:
 *       200:
 *         description: Список всех предметов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/', ItemController.list, errorMiddleware)

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Создает новый предмет
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Предмет успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
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
router.post('/', authMiddleware, ItemController.create, errorMiddleware)

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Возвращает предмет по ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID предмета
 *     responses:
 *       200:
 *         description: Данные предмета
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Предмет не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', ItemController.read, errorMiddleware)

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Обновляет предмет по ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID предмета
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Предмет успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Предмет не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', authMiddleware, ItemController.update, errorMiddleware)

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Удаляет предмет по ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID предмета
 *     responses:
 *       204:
 *         description: Предмет успешно удален
 *       404:
 *         description: Предмет не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/:id', authMiddleware, ItemController.delete, errorMiddleware)
const upload = multer({ storage: multer.memoryStorage() })
/**
 * @swagger
 * /api/items/upload/{id}:
 *   post:
 *     summary: Загружает изображение и обновляет элемент
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: '12345'
 *         description: ID элемента для обновления
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Изображение успешно загружено и элемент обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   example: 'http://localhost:9000/scarbnikpictures/photos/unique-id.png'
 *       400:
 *         description: Ошибка загрузки изображения
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Ошибка загрузки изображения'
 *       404:
 *         description: Элемент не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Элемент не найден'
 */

router.post(
  '/upload/:id',
  authMiddleware,
  upload.single('photo'),
  ItemController.itemUploadImage
)

module.exports = router
