import winston from 'winston'
import { logger, errorLogger } from 'express-winston'
import router from '../router'
import app from '../middleware'
import { join } from 'path'

app.use(logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: join(__dirname, '../../logs', 'access.log'), level: 'info' })
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{res.responseTime}}ms {{res.statusCode}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => {
    return false
  }
}))

app.use(router)

app.use(errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: join(__dirname, '../../logs', 'error.log'), level: 'error' })
  ],
  format: winston.format.combine(
    winston.format.json()
  )
}))

export default app
