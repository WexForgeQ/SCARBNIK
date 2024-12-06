const { UserReport } = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')

class UserReportController {
  async create(req, res, next) {
    try {
      const userReport = await UserReport.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(userReport)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async read(req, res, next) {
    try {
      const userReport = await UserReport.findByPk(req.params.id)
      if (!userReport) {
        return next(ApiError.notFound('Жалоба пользователя не найдена'))
      }
      return res.status(200).json(userReport)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async update(req, res, next) {
    try {
      const [updated] = await UserReport.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        return next(ApiError.notFound('Жалоба пользователя не найдена'))
      }
      const updatedUserReport = await UserReport.findByPk(req.params.id)
      return res.status(200).json(updatedUserReport)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await UserReport.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        return next(ApiError.notFound('Жалоба пользователя не найдена'))
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
        user_id,
        report_type_id,
        fromDate,
        toDate
      } = req.query
      const offset = (page - 1) * limit
      const where = {}
      if (user_id) {
        where.user_id = user_id
      }
      if (report_type_id) {
        where.report_type_id = report_type_id
      }
      if (fromDate || toDate) {
        where.report_date = {}
        if (fromDate) {
          where.report_date.$gte = new Date(fromDate)
        }
        if (toDate) {
          where.report_date.$lte = new Date(toDate)
        }
      }
      const userReports = await UserReport.findAndCountAll({
        where,
        limit,
        offset,
        order: [['report_date', 'DESC']]
      })
      return res.status(200).json(userReports)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }
}

module.exports = new UserReportController()
