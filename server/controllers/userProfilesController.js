const { UserProfile } = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')

const UserProfileController = {
  async create(req, res, next) {
    try {
      const userProfile = await UserProfile.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(userProfile)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  },

  async read(req, res, next) {
    try {
      const userProfile = await UserProfile.findByPk(req.params.id)
      if (!userProfile) {
        return next(ApiError.notFound('Профиль пользователя не найден'))
      }
      return res.status(200).json(userProfile)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  },

  async update(req, res, next) {
    try {
      const [updated] = await UserProfile.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        return next(ApiError.notFound('Профиль пользователя не найден'))
      }
      const updatedUserProfile = await UserProfile.findByPk(req.params.id)
      return res.status(200).json(updatedUserProfile)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  },

  async delete(req, res, next) {
    try {
      const deleted = await UserProfile.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        return next(ApiError.notFound('Профиль пользователя не найден'))
      }
      return res.status(204).json()
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }
}

module.exports = UserProfileController
