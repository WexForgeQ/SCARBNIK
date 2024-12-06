const CategoryController = require('../controllers/categoryController')
const errorMiddleware = require('../middleware/errorMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const Router = require('express')
const router = new Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID категории
 *         name:
 *           type: string
 *           description: Название категории
 *       required:
 *         - name
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API для управления категориями
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Возвращает список всех категорий
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Список всех категорий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', CategoryController.listAll, errorMiddleware)

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Создает новую категорию
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Категория успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
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
router.post('/', authMiddleware, CategoryController.create, errorMiddleware)

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Возвращает категорию по ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Данные категории
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Категория не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', CategoryController.read, errorMiddleware)

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Обновляет категорию по ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID категории
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Категория успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Категория не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', authMiddleware, CategoryController.update, errorMiddleware)

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Удаляет категорию по ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID категории
 *     responses:
 *       204:
 *         description: Категория успешно удалена
 *       404:
 *         description: Категория не найдена
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
  CategoryController.delete,
  errorMiddleware
)

module.exports = router
