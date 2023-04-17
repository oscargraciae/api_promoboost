import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import passport from 'passport'

export default (app: Express) => {
  app.use(compression())
  app.use(cors({ origin: ['http://localhost:5173', 'https://web-promoboost.azurewebsites.net/'] }))
  app.use(morgan('dev'))
  app.use(passport.initialize())
  app.use(express.json())
}
