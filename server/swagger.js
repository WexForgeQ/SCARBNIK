const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'API for user authentication'
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: ['./routes/*.js', './models/swagger.models.js'] // Укажите путь к файлам, где описаны эндпоинты
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (app) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
