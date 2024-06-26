const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_out.json'
const endpointsFiles = ['./app/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles)