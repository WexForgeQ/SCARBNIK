const {
  UserFavorite,
  Item,
  Collection,
  ItemRequest,
  ItemAdvertisement
} = require('../models/models')
const ApiError = require('../errors/ApiError')

class UserFavoriteController {
  async create(req, res, next) {
    try {
      const userFavorite = await UserFavorite.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(201).json(userFavorite)
    } catch (error) {
      return next(ApiError.badRequest(error.message))
    }
  }

  async read(req, res, next) {
    try {
      const userFavorite = await UserFavorite.findByPk(req.params.id)
      if (!userFavorite) {
        return next(ApiError.notFound('Элемент избранного не найден'))
      }
      return res.status(200).json(userFavorite)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async update(req, res, next) {
    try {
      const [updated] = await UserFavorite.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        return next(ApiError.notFound('Элемент избранного не найден'))
      }
      const updatedUserFavorite = await UserFavorite.findByPk(req.params.id)
      return res.status(200).json(updatedUserFavorite)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await UserFavorite.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        return next(ApiError.notFound('Элемент избранного не найден'))
      }
      return res.status(204).json()
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async addFavorite(req, res, next) {
    try {
      const { userId, favoritableId, favoritableType } = req.body
      const newFavorite = await UserFavorite.create({
        id: crypto.randomUUID(),
        user_id: userId,
        favoritable_id: favoritableId,
        favoritable_type: favoritableType
      })
      return res.status(201).json(newFavorite)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async removeFavorite(req, res, next) {
    try {
      const { userId, favoritableId, favoritableType } = req.body
      const existingFavorite = await UserFavorite.findOne({
        where: {
          user_id: userId,
          favoritable_id: favoritableId,
          favoritable_type: favoritableType
        }
      })

      if (existingFavorite) {
        await existingFavorite.destroy()
        return res.status(204).json()
      } else {
        return next(ApiError.notFound('Элемент избранного не найден'))
      }
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async getAllFavorites(req, res, next) {
    try {
      const { userId } = req.params
      const { page = 1, limit = 10, type } = req.query
      const offset = (page - 1) * limit
      const where = { user_id: userId }
      if (type) {
        where.favoritable_type = type
      }
      const userFavorites = await UserFavorite.findAndCountAll({
        where,
        limit,
        offset,
        include: [
          { model: Item },
          { model: Collection },
          { model: ItemRequest },
          { model: ItemAdvertisement }
        ]
      })
      return res.status(200).json(userFavorites)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }
}

module.exports = new UserFavoriteController()
