const {
  ItemAdvertisement,
  Category,
  User,
  Item,
  UserProfile
} = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'alltransbatura@gmail.com',
    pass: 'gpdfozzaxvohzqmi'
  }
})

class ItemAdvertisementController {
  async create(req, res) {
    try {
      const itemAdvertisement = await ItemAdvertisement.create({
        ...req.body,
        id: crypto.randomUUID()
      })
      return res.status(200).json(itemAdvertisement)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async read(req, res, next) {
    try {
      const itemAdvertisement = await ItemAdvertisement.findByPk(
        req.params.id,
        {
          include: [{ model: Category }, { model: User }, { model: Item }]
        }
      )
      if (!itemAdvertisement) {
        return next(ApiError.notFound('Объявление на предмет не найдено'))
      }
      return res.status(200).json(itemAdvertisement)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const [updated] = await ItemAdvertisement.update(req.body, {
        where: { id: req.params.id }
      })
      if (!updated) {
        throw ApiError.notFound('Объявление на предмет не найдено')
      }
      const updatedItemAdvertisement = await ItemAdvertisement.findByPk(
        req.params.id,
        {
          include: [{ model: Category }, { model: User }, { model: Item }]
        }
      )
      return res.status(200).json(updatedItemAdvertisement)
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async delete(req, res) {
    try {
      const deleted = await ItemAdvertisement.destroy({
        where: { id: req.params.id }
      })
      if (!deleted) {
        throw ApiError.notFound('Объявление на предмет не найдено')
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async advertResponse(req, res, next) {
    try {
      const { user_id, owner_id, item_id } = req.query
      console.log(req.params)
      const advert = await ItemAdvertisement.findOne({
        where: { id: item_id }
      })

      if (!advert) {
        return next(ApiError.notFound('Объявление на предмет не найдено'))
      }

      const user = await User.findOne({
        where: { id: user_id }
      })

      const owner = await User.findOne({
        where: { id: owner_id }
      })

      if (!user || !owner) {
        return next(
          ApiError.notFound('Пользователь или владелец объявления не найден')
        )
      }

      const userNotification = {
        from: 'alltransbatura@gmail.com',
        to: user.email,
        subject: 'Отклик на объявление',
        text: `Вы откликнулись на объявление пользователя ${owner.email}. Удачного обмена!`
      }

      const ownerNotification = {
        from: 'alltransbatura@gmail.com',
        to: owner.email,
        subject: 'Отклик на ваше объявление',
        text: `Ваше объявление получило отклик от пользователя ${user.email}. Удачного обмена!`
      }

      await transporter.sendMail(userNotification)
      await transporter.sendMail(ownerNotification)

      return res.status(200).json()
    } catch (error) {
      console.log(error)
      return res.status(error.status || 400).json({ error: error.message })
    }
  }

  async listAll(req, res) {
    const {
      page = 1,
      pageSize = 10,
      item_id,
      user_id,
      advertisement_description,
      category_id,
      sortField = 'id',
      sortOrder = 'ASC'
    } = req.query

    const filter = {
      ...(item_id && { item_id: { [Op.eq]: item_id } }),
      ...(user_id && { user_id: { [Op.eq]: user_id } }),
      ...(advertisement_description && {
        advertisement_description: {
          [Op.like]: `%${advertisement_description}%`
        }
      }),
      ...(category_id && { category_id: { [Op.eq]: category_id } })
    }

    const options = {
      where: filter,
      include: [
        { model: Category },
        { model: User, include: [UserProfile] },
        { model: Item }
      ],
      order: [[sortField, sortOrder.toUpperCase()]],
      limit: parseInt(pageSize, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(pageSize, 10)
    }

    try {
      const { count, rows: itemAdvertisements } =
        await ItemAdvertisement.findAndCountAll(options)
      return res.status(200).json({ total: count, itemAdvertisements })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

module.exports = new ItemAdvertisementController()
