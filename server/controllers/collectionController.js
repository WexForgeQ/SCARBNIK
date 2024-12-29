const {
  Collection,
  CollectionItem,
  Item,
  Category
} = require('../models/models')
const ApiError = require('../errors/ApiError')

class CollectionController {
  async create(req, res, next) {
    try {
      const collection = await Collection.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(collection)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async read(req, res, next) {
    try {
      const collection = await Collection.findByPk(req.params.id, {
        include: [{ model: CollectionItem, include: [Item] }]
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
      const { page = 1, limit = 10, title, type } = req.query
      const offset = (page - 1) * limit
      const where = {}
      if (title) {
        where.title = { [Op.like]: `%${title}%` }
      }
      if (type) {
        where.category_id = type
      }
      const collections = await Collection.findAndCountAll({
        where,
        limit,
        offset,
        include: [
          { model: CollectionItem, include: [Item] },
          { model: Category }
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
