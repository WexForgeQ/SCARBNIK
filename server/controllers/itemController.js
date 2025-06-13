const { Item } = require('../models/models')
const ApiError = require('../errors/ApiError')
const { Op } = require('sequelize')
const crypto = require('crypto')
const sharp = require('sharp')
const minioClient = require('../minio')
const OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAPI_KEY
})

const saveImageToMinIO = async (buffer) => {
  const bucketName = 'scarbnikpictures'
  const objectName = `photos/${crypto.randomUUID()}.png`
  const pngBuffer = await sharp(buffer).png().toBuffer()
  await minioClient.putObject(bucketName, objectName, pngBuffer, {
    'Content-Type': 'image/png'
  })
  return `http://${minioClient.host}:${minioClient.port}/${bucketName}/${objectName}`
}

class ItemController {
  async itemUploadImage(req, res) {
    try {
      const photoBuffer = req.file.buffer
      const imageUrl = await saveImageToMinIO(photoBuffer)
      const [updated] = await Item.update(
        { photo: imageUrl },
        {
          where: { id: req.params.id }
        }
      )
      if (!updated) {
        throw ApiError.notFound('Элемент не найден')
      }
      return res.status(200).json({ imageUrl })
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async create(req, res) {
    try {
      const item = await Item.create({
        id: crypto.randomUUID(),
        ...req.body
      })

      return res.status(200).json(item)
    } catch (error) {
      console.log(error)
      throw ApiError.badRequest(error.message)
    }
  }

  async read(req, res, next) {
    try {
      const item = await Item.findByPk(req.params.id)
      if (!item) {
        throw ApiError.notFound('Элемент не найден')
      }
      return res.status(200).json(item)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error.message))
    }
  }

  async getInfo(req, res, next) {
    try {
      console.log(req.body)
      const item = await Item.findByPk(req.body.id)
      if (!item) {
        throw ApiError.notFound('Элемент не найден')
      }

      // Дожидаемся ответа от OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
          {
            role: 'user',
            content: `Опиши полностью антикварный предмет по его описанию и названию. Опиши его историю и значимость и добавь интересных фактов и оценочную стоимость. Название и описание: ${item.title} и ${item.item_description}. Форматируй просто строка с абзацами`
          }
        ]
      })

      const aiResult = completion.choices[0].message

      console.log(aiResult)
      return res.status(200).json(aiResult.content)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error.message))
    }
  }

  async getExchangeRate(req, res, next) {
    try {
      console.log(req.body)
      const firstItem = await Item.findByPk(req.body.first_item_id)
      const secondItem = await Item.findByPk(req.body.second_item_id)

      if (!firstItem || !secondItem) {
        throw ApiError.notFound('Элемент не найден')
      }

      // Дожидаемся ответа от OpenAI
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
          {
            role: 'user',
            content: `Оцени эквивалентность обмена предметами и выгоду для каждого участника обмена по десятибальной шкале. Верни только оценку и комментарий к оценке с названиями и описаниями 1: ${firstItem.title}:${firstItem.item_description} 2: ${secondItem.title}:${secondItem.item_description}. Формат - просто строка`
          }
        ]
      })

      const aiResult = completion.choices[0].message

      console.log(aiResult)
      return res.status(200).json(aiResult.content)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error.message))
    }
  }

  async update(req, res) {
    try {
      const [updated] = await Item.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        throw ApiError.notFound('Элемент не найден')
      }
      const updatedItem = await Item.findByPk(req.params.id)
      return res.status(200).json(updatedItem)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Item.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Элемент не найден')
      }
      return res.status(204).json()
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async list(req, res) {
    try {
      const { page = 1, limit = 10, name, owner_id } = req.query
      const offset = (page - 1) * limit

      const where = {}

      if (name) {
        where.title = { [Op.like]: `%${name}%` }
      }

      if (owner_id) {
        where.owner_id = owner_id
      }

      const items = await Item.findAll({
        where,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        order: [['title', 'ASC']]
      })

      return res.status(200).json(items)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new ItemController()
