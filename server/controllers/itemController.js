const { Item } = require('../models/models')
const ApiError = require('../errors/ApiError')

class ItemController {
  async create(req, res) {
    try {
      const item = await Item.create({ ...req.body, id: crypto.randomUUID() })
      return res.status(201).json(item)
    } catch (error) {
      throw ApiError.badRequest(error.message)
    }
  }

  async read(req, res) {
    try {
      const item = await Item.findByPk(req.params.id)
      if (!item) {
        throw ApiError.notFound('Элемент не найден')
      }
      return res.status(200).json(item)
    } catch (error) {
      throw ApiError.internal('Внутренняя ошибка сервера')
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
      throw ApiError.internal('Внутренняя ошибка сервера')
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
      throw ApiError.internal('Внутренняя ошибка сервера')
    }
  }

  async list(req, res) {
    try {
      const { page = 1, limit = 10, name, owner_id } = req.query
      const offset = (page - 1) * limit

      const where = name ? { name: { [Op.like]: `%${name}%` } } : {}

      if (owner_id) where.owner_id = owner_id

      const items = await Item.findAll({
        where,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10)
      })

      return res.status(200).json(items)
    } catch (error) {
      throw ApiError.internal('Внутренняя ошибка сервера')
    }
  }
}

module.exports = new ItemController()
