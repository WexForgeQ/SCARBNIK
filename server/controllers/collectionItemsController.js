const { CollectionItem, Item } = require('../models/models')
const ApiError = require('../errors/ApiError')

class CollectionItemController {
  async create(req, res, next) {
    try {
      const collectionItem = await CollectionItem.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(collectionItem)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async read(req, res, next) {
    try {
      const collectionItem = await CollectionItem.findByPk(req.params.id)
      if (!collectionItem) {
        throw ApiError.notFound('Элемент коллекции не найден')
      }
      return res.status(200).json(collectionItem)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
  async update(req, res, next) {
    try {
      const [updated] = await CollectionItem.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        throw ApiError.notFound('Элемент коллекции не найден')
      }
      const updatedCollectionItem = await CollectionItem.findByPk(req.params.id)
      return res.status(200).json(updatedCollectionItem)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await CollectionItem.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Элемент коллекции не найден')
      }
      return res.status(200).json()
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async addItem(req, res, next) {
    try {
      const { collectionId, itemId } = req.body

      const existingItem = await CollectionItem.findOne({
        where: {
          collection_id: collectionId,
          item_id: itemId
        }
      })

      if (existingItem) {
        return next(ApiError.forbidden('Предмет уже есть в коллекции'))
      }
      const collectionItem = await CollectionItem.create({
        id: crypto.randomUUID(),
        collection_id: collectionId,
        item_id: itemId
      })
      return res.status(200).json(collectionItem)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async removeItem(req, res, next) {
    try {
      const { collectionId, itemId } = req.body
      const deleted = await CollectionItem.destroy({
        where: { collection_id: collectionId, item_id: itemId }
      })
      if (!deleted) {
        throw ApiError.notFound('Элемент коллекции не найден')
      }
      return res.status(204).json()
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async getAllItems(req, res, next) {
    try {
      const collectionId = req.params.collectionId
      const items = await CollectionItem.findAll({
        where: { collection_id: collectionId },
        include: [Item]
      })
      return res.status(200).json(items)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new CollectionItemController()
