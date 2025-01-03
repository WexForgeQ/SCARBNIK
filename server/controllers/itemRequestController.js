const {
  ItemRequest,
  Category,
  User,
  UserProfile,
  Item
} = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')
const minioClient = require('../minio')
const sharp = require('sharp')

const saveImageToMinIO = async (buffer) => {
  const bucketName = 'scarbnikpictures'
  const objectName = `photos/${crypto.randomUUID()}.png`
  const pngBuffer = await sharp(buffer).png().toBuffer()
  await minioClient.putObject(bucketName, objectName, pngBuffer, {
    'Content-Type': 'image/png'
  })
  return `http://${minioClient.host}:${minioClient.port}/${bucketName}/${objectName}`
}

const saveBase64ImageToMinIO = async (base64String) => {
  const bucketName = 'scarbnikpictures'
  const objectName = `photos/${crypto.randomUUID()}.png`
  const buffer = Buffer.from(base64Data, 'base64')
  const pngBuffer = await sharp(buffer).png().toBuffer()
  await minioClient.putObject(bucketName, objectName, pngBuffer, {
    'Content-Type': 'image/png'
  })
  return `http://${minioClient.host}:${minioClient.port}/${bucketName}/${objectName}`
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'alltransbatura@gmail.com',
    pass: 'gpdfozzaxvohzqmi'
  }
})

class ItemRequestController {
  async create(req, res, next) {
    try {
      const buffer = req.file.buffer
      const imageUrl = await saveImageToMinIO(buffer)
      if (!imageUrl) {
        return next(ApiError.notFound('Ошибка добавления фото'))
      }
      const itemRequest = await ItemRequest.create({
        ...req.body,
        request_photo: imageUrl,
        id: crypto.randomUUID()
      })
      return res.status(200).json(itemRequest)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async requestResponse(req, res, next) {
    try {
      const { user_id, owner_id, item_id } = req.query

      const advert = await ItemRequest.findOne({
        where: { id: item_id }
      })

      if (!advert) {
        return next(ApiError.notFound('Запрос на предмет не найден'))
      }

      const user = await User.findOne({
        where: { id: user_id }
      })

      const owner = await User.findOne({
        where: { id: owner_id }
      })

      if (!user || !owner) {
        return next(
          ApiError.notFound('Пользователь или владелец запроса не найден')
        )
      }

      const userNotification = {
        from: 'alltransbatura@gmail.com',
        to: user.email,
        subject: 'Отклик на запрос',
        text: `Вы откликнулись на запрос пользователя ${owner.email}. Удачного обмена!`
      }

      const ownerNotification = {
        from: 'alltransbatura@gmail.com',
        to: owner.email,
        subject: 'Отклик на ваше запрос',
        text: `Ваш запрос получил отклик от пользователя ${user.email}. Удачного обмена!`
      }

      await transporter.sendMail(userNotification)
      await transporter.sendMail(ownerNotification)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async read(req, res) {
    try {
      const itemRequest = await ItemRequest.findByPk(req.params.id, {
        include: [{ model: Category }]
      })
      if (!itemRequest) {
        throw ApiError.notFound('Запрос на предмет не найден')
      }
      return res.status(200).json(itemRequest)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const buffer = req.file.buffer
      const imageUrl = await saveImageToMinIO(buffer)
      if (!imageUrl) {
        return next(ApiError.notFound('Ошибка добавления фото'))
      }
      const [updated] = await ItemRequest.update(
        { ...req.body, request_photo: imageUrl },
        {
          where: { id: req.params.id }
        }
      )
      if (!updated) {
        throw ApiError.notFound('Запрос на предмет не найден')
      }

      const updatedItemRequest = await ItemRequest.findByPk(req.params.id, {
        include: [{ model: Category }]
      })
      return res.status(200).json(updatedItemRequest)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      const deleted = await ItemRequest.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Запрос на предмет не найден')
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async listAll(req, res) {
    const {
      page = 1,
      pageSize = 10,
      item_title,
      request_description,
      request_photo,
      category_id,
      sortField = 'id',
      sortOrder = 'ASC',
      user_id
    } = req.query

    const filter = {
      ...(item_title && { item_title: { [Op.like]: `%${item_title}%` } }),
      ...(request_description && {
        request_description: { [Op.like]: `%${request_description}%` }
      }),
      ...(request_photo && {
        request_photo: { [Op.like]: `%${request_photo}%` }
      }),
      ...(category_id && { category_id: { [Op.eq]: category_id } }),
      ...(user_id && { user_id: { [Op.eq]: user_id } })
    }

    const options = {
      where: filter,
      include: [{ model: Category }, { model: User, include: [UserProfile] }],
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: parseInt(pageSize, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10)
    }

    try {
      const { count, rows: itemRequests } =
        await ItemRequest.findAndCountAll(options)
      return res.status(200).json({ total: count, itemRequests })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new ItemRequestController()
