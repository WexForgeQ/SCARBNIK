const { CollectionItem, Item } = require('../models/models')
const ApiError = require('../errors/ApiError')

const CollectionItemController = {
  async create(req, res) {
    try {
      const collectionItem = await CollectionItem.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(collectionItem)
    } catch (error) {
      throw ApiError.badRequest(error.message)
    }
  },

  async read(req, res) {
    try {
      const collectionItem = await CollectionItem.findByPk(req.params.id)
      if (!collectionItem) {
        throw ApiError.notFound('Элемент коллекции не найден')
      }
      return res.status(200).json(collectionItem)
    } catch (error) {
      throw ApiError.badRequest(error.message)
    }
  },

  async update(req, res) {
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
      throw ApiError.badRequest(error.message)
    }
  },

  async delete(req, res) {
    try {
      const deleted = await CollectionItem.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Элемент коллекции не найден')
      }
      return res.status(204).json()
    } catch (error) {
      throw ApiError.badRequest(error.message)
    }
  },

  async addItem(req, res) {
    try {
      const { collectionId, itemId } = req.body
      const collectionItem = await CollectionItem.create({
        id: crypto.randomUUID(),
        collection_id: collectionId,
        item_id: itemId
      })
      return res.status(201).json(collectionItem)
    } catch (error) {
      throw ApiError.badRequest(error.message)
    }
  },

  async removeItem(req, res) {
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
      throw ApiError.badRequest(error.message)
    }
  },

  async getAllItems(req, res) {
    try {
      const collectionId = req.params.collectionId
      const items = await CollectionItem.findAll({
        where: { collection_id: collectionId },
        include: [Item]
      })
      return res.status(200).json(items)
    } catch (error) {
      throw ApiError.badRequest(error.message)
    }
  }
}

module.exports = CollectionItemController
