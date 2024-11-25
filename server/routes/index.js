const express = require('express')
const authRouter = require('./authRouter')
const router = express.Router()

// router.use('/user', userRouter)
router.use('/auth', authRouter)
// router.use('/orders', orderRouter)
// router.use('/', refresh)
module.exports = router
