const { Category } = require('../models/models')
const ApiError = require('../errors/ApiError')

class CategoryController {
  async create(req, res) {
    try {
      const category = await Category.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(category)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async read(req, res) {
    try {
      const category = await Category.findByPk(req.params.id)
      if (!category) {
        throw ApiError.notFound('Категория не найдена')
      }
      return res.status(200).json(category)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const [updated] = await Category.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        throw ApiError.notFound('Категория не найдена')
      }
      const updatedCategory = await Category.findByPk(req.params.id)
      return res.status(200).json(updatedCategory)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Category.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Категория не найдена')
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async listAll(req, res) {
    try {
      const categories = await Category.findAll()
      return res.status(200).json(categories)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new CategoryController()
