const {
  Category,
  UsersExchange,
  ExchangeItem,
  Item,
  User,
  UserProfile,
  ItemAdvertisement
} = require('../models/models')
const { Op } = require('sequelize')
const ApiError = require('../errors/ApiError')

class ExchangeController {
  async createExchange(req, res, next) {
    try {
      const existingProposal = await UsersExchange.findOne({
        where: {
          owner_id: req.body.owner_id,
          exch_item_id: req.body.exch_item_id,
          proposal_item_id: req.body.proposal_item_id
        }
      })

      const exchange = await UsersExchange.create({
        id: crypto.randomUUID(),
        ...req.body
      })

      res.status(200).json({ message: 'Обмен создан', exchange })
    } catch (error) {
      console.log(error)
      next(ApiError.internal('Ошибка при создании обмена'))
    }
  }

  async confirmExchangeByOwner(req, res, next) {
    const { exchange_id } = req.body
    try {
      const exchange = await UsersExchange.findByPk(exchange_id)
      if (!exchange) {
        return next(ApiError.notFound('Обмен не найден'))
      }

      exchange.submitted_by_owner = true

      if (exchange.submitted_by_owner && exchange.submitted_by_user) {
        const item1 = await Item.findByPk(exchange.exch_item_id)
        const item2 = await Item.findByPk(exchange.proposal_item_id)

        if (!item1 || !item2) {
          return next(ApiError.notFound('Предметы обмена не найдены'))
        }
        const exchangesToRecreate = await UsersExchange.findAll({
          where: {
            submitted_by_owner: true,
            submitted_by_user: true
          }
        })

        await Item.destroy({ where: { id: item1.id }, cascade: true })
        await Item.destroy({ where: { id: item2.id }, cascade: true })
        const newItem1 = await Item.create({
          ...item1.toJSON(),
          id: item1.id,
          owner_id: item2.owner_id
        })

        const newItem2 = await Item.create({
          ...item2.toJSON(),
          id: item2.id,
          owner_id: item1.owner_id
        })
        for (const oldExchange of exchangesToRecreate) {
          await UsersExchange.create({
            ...oldExchange.toJSON(),
            id: crypto.randomUUID()
          })
        }
        await UsersExchange.create({
          ...exchange.toJSON(),
          id: crypto.randomUUID()
        })
      }

      await exchange.save()

      res
        .status(200)
        .json({ message: 'Обмен подтвержден владельцем', exchange })
    } catch (error) {
      console.log(error)
      next(ApiError.internal('Ошибка при подтверждении обмена'))
    }
  }

  async confirmExchangeByProposer(req, res, next) {
    const { exchange_id } = req.body
    try {
      const exchange = await UsersExchange.findByPk(exchange_id)
      if (!exchange) {
        return next(ApiError.notFound('Обмен не найден'))
      }

      exchange.submitted_by_user = true

      if (exchange.submitted_by_owner && exchange.submitted_by_user) {
        const item1 = await Item.findByPk(exchange.exch_item_id)
        const item2 = await Item.findByPk(exchange.proposal_item_id)

        if (!item1 || !item2) {
          return next(ApiError.notFound('Предметы обмена не найдены'))
        }

        const exchangesToRecreate = await UsersExchange.findAll({
          where: {
            submitted_by_owner: true,
            submitted_by_user: true
          }
        })
        for (const oldExchange of exchangesToRecreate) {
          await UsersExchange.create({
            ...oldExchange.toJSON(),
            id: crypto.randomUUID()
          })
        }

        await Item.destroy({ where: { id: item1.id }, cascade: true })
        await Item.destroy({ where: { id: item2.id }, cascade: true })
        const newItem1 = await Item.create({
          ...item1.toJSON(),
          id: item1.id,
          owner_id: item2.owner_id
        })

        const newItem2 = await Item.create({
          ...item2.toJSON(),
          id: item2.id,
          owner_id: item1.owner_id
        })
        await UsersExchange.create({
          ...exchange.toJSON(),
          id: crypto.randomUUID()
        })
      }

      await exchange.save()

      res
        .status(200)
        .json({ message: 'Обмен подтвержден предлагателем', exchange })
    } catch (error) {
      console.log(error)
      next(ApiError.internal('Ошибка при подтверждении обмена'))
    }
  }

  async deleteExchange(req, res, next) {
    const { exchange_id } = req.params

    try {
      const exchange = await UsersExchange.findByPk(exchange_id)

      if (!exchange) {
        return next(ApiError.notFound('Обмен не найден'))
      }

      await exchange.destroy()

      res.status(200).json({ message: 'Обмен удален' })
    } catch (error) {
      next(ApiError.internal('Ошибка при удалении обмена'))
    }
  }

  async getAllExchanges(req, res, next) {
    const { page = 1, limit = 10, user_id } = req.query
    try {
      const offset = (page - 1) * limit
      const exchanges = await UsersExchange.findAndCountAll({
        include: [
          { model: User, as: 'owner', include: [UserProfile] },
          {
            model: Item,
            as: 'exchangeItem',
            include: [{ model: User, include: [UserProfile] }]
          },
          {
            model: Item,
            as: 'proposalItem',
            include: [{ model: User, include: [UserProfile] }]
          }
        ],
        order: [['createdAt', 'DESC']]
      })

      res.status(200).json({
        exchanges: exchanges.rows,
        total: exchanges.count,
        pages: Math.ceil(exchanges.count / limit)
      })
    } catch (error) {
      console.log(error)
      next(ApiError.internal('Ошибка при получении обменов'))
    }
  }
}

module.exports = new ExchangeController()
