const { UserProfile } = require('../models/models')
const ApiError = require('../errors/ApiError')
const crypto = require('crypto')
const minioClient = require('../minio')
const sharp = require('sharp')

const saveImageToMinIO = async (buffer) => {
  const bucketName = 'scarbnikpictures'
  const objectName = `photos/${crypto.randomUUID()}.png`
  const pngBuffer = await sharp(buffer).png().toBuffer()
  await minioClient.putObject(bucketName, objectName, pngBuffer, {
    'Content-Type': 'image/png'
  })
  return `http://${minioClient.host}:${minioClient.port}/${bucketName}/${objectName}`
}

const saveBase64ImageToMinIO = async (base64String) => {
  const bucketName = 'scarbnikpictures'
  const objectName = `photos/${crypto.randomUUID()}.png`
  const buffer = Buffer.from(base64Data, 'base64')
  const pngBuffer = await sharp(buffer).png().toBuffer()
  await minioClient.putObject(bucketName, objectName, pngBuffer, {
    'Content-Type': 'image/png'
  })
  return `http://${minioClient.host}:${minioClient.port}/${bucketName}/${objectName}`
}

class UserProfileController {
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
  }

  async uploadImage(req, res, next) {
    try {
      console.log(req.file)
      const buffer = req.file.buffer
      console.log(buffer)
      const imageUrl = await saveImageToMinIO(buffer)
      console.log(imageUrl)
      const updatedUserProfile = await UserProfile.update(
        { photo: imageUrl },
        { where: { user_id: req.body.userId } }
      )
      res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl,
        updatedUserProfile
      })
    } catch (error) {
      console.log(error)
      next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async read(req, res, next) {
    try {
      const userProfile = await UserProfile.findOne({ user_id: req.params.id })
      if (!userProfile) {
        return next(ApiError.notFound('Профиль пользователя не найден'))
      }
      return res.status(200).json(userProfile)
    } catch (error) {
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async update(req, res, next) {
    try {
      const { photo, ...otherData } = req.body
      let photoUrl = photo
      if (photo) {
        photoUrl = await saveBase64ImageToMinIO(photo)
      }

      const [updated] = await UserProfile.update(
        { ...otherData, photo: photoUrl },
        {
          where: { user_id: req.params.id }
        }
      )

      if (!updated) {
        return next(ApiError.notFound('Профиль пользователя не найден'))
      }

      const updatedUserProfile = await UserProfile.findOne({
        user_id: req.params.id
      })
      return res.status(200).json(updatedUserProfile)
    } catch (error) {
      console.log(error)
      return next(ApiError.internal('Произошла внутренняя ошибка сервера'))
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await UserProfile.destroy({
        where: { user_id: req.params.id }
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

module.exports = new UserProfileController()
