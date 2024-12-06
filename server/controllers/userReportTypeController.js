const { UserReportType } = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')

class UserReportTypeController {
  async create(req, res) {
    try {
      const userReportType = await UserReportType.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(userReportType)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async read(req, res) {
    try {
      const userReportType = await UserReportType.findByPk(req.params.id)
      if (!userReportType) {
        throw ApiError.notFound('Тип жалобы не найден')
      }
      return res.status(200).json(userReportType)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const [updated] = await UserReportType.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        throw ApiError.notFound('Тип жалобы не найден')
      }
      const updatedUserReportType = await UserReportType.findByPk(req.params.id)
      return res.status(200).json(updatedUserReportType)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      const deleted = await UserReportType.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Тип жалобы не найден')
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async listAll(req, res) {
    try {
      const userReportTypes = await UserReportType.findAll()
      return res.status(200).json(userReportTypes)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new UserReportTypeController()
