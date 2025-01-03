const express = require('express')
const UserFavoriteController = require('../controllers/userFavoritesController')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     UserFavorite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID элемента избранного
 *         user_id:
 *           type: string
 *           description: ID пользователя
 *         favoritable_id:
 *           type: string
 *           description: ID избранного элемента
 *         favoritable_type:
 *           type: string
 *           description: Тип избранного элемента
 *       required:
 *         - user_id
 *         - favoritable_id
 *         - favoritable_type
 */

/**
 * @swagger
 * tags:
 *   name: UserFavorites
 *   description: API для управления избранными элементами пользователя
 */

/**
 * @swagger
 * /api/userfavorites:
 *   post:
 *     summary: Создает новый элемент избранного
 *     tags: [UserFavorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserFavorite'
 *     responses:
 *       201:
 *         description: Элемент избранного успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFavorite'
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
router.post('/', authMiddleware, UserFavoriteController.create, errorMiddleware)

/**
 * @swagger
 * /api/userfavorites/{id}:
 *   get:
 *     summary: Возвращает элемент избранного по ID
 *     tags: [UserFavorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID элемента избранного
 *     responses:
 *       200:
 *         description: Данные элемента избранного
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFavorite'
 *       404:
 *         description: Элемент избранного не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
//router.get('/:id', UserFavoriteController.read)

/**
 * @swagger
 * /api/userfavorites/{id}:
 *   put:
 *     summary: Обновляет элемент избранного по ID
 *     tags: [UserFavorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID элемента избранного
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserFavorite'
 *     responses:
 *       200:
 *         description: Элемент избранного успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFavorite'
 *       404:
 *         description: Элемент избранного не найден
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
  UserFavoriteController.update,
  errorMiddleware
)

/**
 * @swagger
 * /api/userfavorites/{id}:
 *   delete:
 *     summary: Удаляет элемент избранного по ID
 *     tags: [UserFavorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID элемента избранного
 *     responses:
 *       204:
 *         description: Элемент избранного успешно удален
 *       404:
 *         description: Элемент избранного не найден
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
  UserFavoriteController.delete,
  errorMiddleware
)

/**
 * @swagger
 * /api/userfavorites/addFavorite:
 *   post:
 *     summary: Добавляет элемент в избранное
 *     tags: [UserFavorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               favoritableId:
 *                 type: string
 *               favoritableType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Элемент успешно добавлен в избранное
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFavorite'
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
  '/addFavorite',
  authMiddleware,
  UserFavoriteController.addFavorite,
  errorMiddleware
)

/**
 * @swagger
 * /api/userfavorites/removeFavorite:
 *   post:
 *     summary: Удаляет элемент из избранного
 *     tags: [UserFavorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               favoritableId:
 *                 type: string
 *               favoritableType:
 *                 type: string
 *     responses:
 *       204:
 *         description: Элемент успешно удален из избранного
 *       404:
 *         description: Элемент избранного не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post(
  '/removeFavorite',
  authMiddleware,
  UserFavoriteController.removeFavorite,
  errorMiddleware
)

/**
 * @swagger
 * /api/userfavorites/{userId}/favorites:
 *   get:
 *     summary: Возвращает все избранные элементы для данного пользователя
 *     tags: [UserFavorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
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
 *         name: type
 *         schema:
 *           type: string
 *         description: Тип избранного элемента
 *     responses:
 *       200:
 *         description: Список всех избранных элементов пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserFavorite'
 */
router.get(
  '/getAll',
  authMiddleware,
  UserFavoriteController.getAllFavorites,
  errorMiddleware
)

module.exports = router
