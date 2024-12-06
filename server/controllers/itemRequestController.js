const { ItemRequest, Category } = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')
const { Op } = require('sequelize')

class ItemRequestController {
  async create(req, res) {
    try {
      const itemRequest = await ItemRequest.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(itemRequest)
    } catch (error) {
      return res.status(400).json({ error: error.message })
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
      const [updated] = await ItemRequest.update(req.body, {
        where: { id: req.params.id }
      })
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
      sortOrder = 'ASC'
    } = req.query

    const filter = {
      ...(item_title && { item_title: { [Op.like]: `%${item_title}%` } }),
      ...(request_description && {
        request_description: { [Op.like]: `%${request_description}%` }
      }),
      ...(request_photo && {
        request_photo: { [Op.like]: `%${request_photo}%` }
      }),
      ...(category_id && { category_id: { [Op.eq]: category_id } })
    }

    const options = {
      where: filter,
      include: [{ model: Category }],
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
