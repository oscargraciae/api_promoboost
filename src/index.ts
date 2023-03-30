import express from 'express'
import { Redis } from 'ioredis'

import routes from './config/routes'
import middlewares from './config/middlewares'
import { errorHandler, logErrors } from './middlewares/error.handler'
import sequelize from './entities'

const app = express()

middlewares(app)
routes(app)

if (global.redis !== undefined) {
  console.log('redis ya existe')
} else {
  const redis = new Redis('redis://localhost:6379')
  global.redis = redis
}

app.use(logErrors)
app.use(errorHandler)

const port = 8000

app.listen(port, () => { console.log(`Server listen on port: ${port}`) })

// sequelize.sync({ alter: true })
//   .then(() => { app.listen(port, () => { console.log(`Server listen on port: ${port}`) }) })
//   .catch((error: any) => console.log('ERROR DE SINCRONIZACION', error.message))

// "start": "NODE_ENV=production NODE_OPTIONS=--max_old_space_size=4096 node -r dotenv-flow/config dist/index.js",
