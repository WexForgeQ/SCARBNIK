const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const errorMiddleware = require('../middleware/errorMiddleware')
const exchangeController = require('../controllers/exchangeController')
const router = express.Router()

router.post(
  '/',
  authMiddleware,
  exchangeController.createExchange,
  errorMiddleware
)

router.post(
  '/confirmByOwner',
  authMiddleware,
  exchangeController.confirmExchangeByOwner,
  errorMiddleware
)

router.post(
  '/confirmByProposer',
  authMiddleware,
  exchangeController.confirmExchangeByProposer,
  errorMiddleware
)

router.get(
  '/',
  authMiddleware,
  exchangeController.getAllExchanges,
  errorMiddleware
)

router.delete(
  '/',
  authMiddleware,
  exchangeController.deleteExchange,
  errorMiddleware
)

module.exports = router
