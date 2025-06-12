const { Item } = require('../models/models')
const ApiError = require('../errors/ApiError')
const { Op } = require('sequelize')
const crypto = require('crypto')
const sharp = require('sharp')
const minioClient = require('../minio')
const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey:
    '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'
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
            content: `Опиши полностью антикварный предмет по его описанию и названию. Опиши его историю и значимость и добавь интересных фактов. Название и описание: ${item.title} и ${item.item_description}. Форматируй как просто текст для вывода в HTML`
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
