const {
  Collection,
  CollectionItem,
  Item,
  Category,
  User,
  CollectionRating,
  UserProfile
} = require('../models/models')
const ApiError = require('../errors/ApiError')
const { Op } = require('sequelize')
class CollectionController {
  async create(req, res, next) {
    try {
      const collection = await Collection.create({
        ...req.body,
        id: crypto.randomUUID(),
        views_count: 0
      })
      return res.status(200).json(collection)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async rateCollection(req, res, next) {
    try {
      const { collection_id, user_id, rate_text, rate } = req.body

      const collection = await Collection.findByPk(collection_id)
      if (!collection) {
        return next(ApiError.badRequest('Коллекция не найдена'))
      }

      if (collection.owner_id === user_id) {
        return next(
          ApiError.badRequest(
            'Вы не можете оценивать свою собственную коллекцию'
          )
        )
      }

      const existingRating = await CollectionRating.findOne({
        where: {
          collection_id: collection_id,
          user_id: user_id
        }
      })

      if (existingRating) {
        return next(ApiError.badRequest('Вы уже оценивали данную коллекцию'))
      }

      const collectionRating = await CollectionRating.create({
        id: crypto.randomUUID(),
        collection_id: collection_id,
        user_id: user_id,
        rate_text: rate_text,
        rate: rate
      })

      return res.status(200).json(collectionRating)
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message })
    }
  }

  async deleteRating(req, res, next) {
    try {
      const { collection_id, user_id } = req.body

      const rating = await CollectionRating.findOne({
        where: {
          collection_id: collection_id,
          user_id: user_id
        }
      })

      if (!rating) {
        return next(ApiError.badRequest('Ваш комментарий не найден'))
      }

      await rating.destroy()

      return res.status(200).json({ message: 'Комментарий удален' })
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message })
    }
  }

  async read(req, res, next) {
    try {
      const collection = await Collection.findByPk(req.params.id, {
        include: [
          { model: CollectionItem, include: [Item] },
          { model: Category },
          { model: User, include: [UserProfile] },
          {
            model: CollectionRating,
            include: [{ model: User, include: [UserProfile] }]
          }
        ]
      })
      if (!collection) {
        return next(ApiError.notFound('Коллекция не найдена'))
      }
      return res.status(200).json(collection)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async update(req, res, next) {
    try {
      const [updated] = await Collection.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        return next(ApiError.notFound('Коллекция не найдена'))
      }
      const updatedCollection = await Collection.findByPk(req.params.id)
      return res.status(200).json(updatedCollection)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await Collection.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        return next(ApiError.notFound('Коллекция не найдена'))
      }
      return res.status(204).json()
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async getAll(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        title,
        category_id,
        owner_id,
        isPublic
      } = req.query
      const offset = (page - 1) * limit
      const where = {}
      if (title) {
        where.title = { [Op.like]: `%${title}%` }
      }
      if (owner_id) {
        where.owner_id = owner_id
      }
      if (category_id) {
        where.category_id = category_id
      }
      if (isPublic) {
        where.isPublic = isPublic
      }
      const collections = await Collection.findAndCountAll({
        where,
        limit,
        offset,
        order: [['title', 'ASC']],
        include: [
          { model: CollectionItem, include: [Item] },
          { model: Category },
          { model: User },
          { model: CollectionRating }
        ]
      })
      return res.status(200).json(collections)
    } catch (error) {
      console.log(error)
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }
}

module.exports = new CollectionController()
