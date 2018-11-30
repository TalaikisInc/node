import winston from 'winston'
import { logger, errorLogger } from 'express-winston'
import router from '../router'
import app from '../middleware'
import { join } from 'path'

let transports = []
const devTransports = [
  new winston.transports.Console()
]

const prodTransports = [
  new winston.transports.File({ filename: join(__dirname, '../../.logs', 'logs.log'), level: 'info' })
]

transports = process.env.NODE_ENV === 'production' ? prodTransports : devTransports

app.use(logger({
  transports: transports,
  format: winston.format.combine(
    winston.format.json()
  ),
  meta: false,
  msg: 'HTTP {{req.method}} {{res.responseTime}}ms {{res.statusCode}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => {
    return false
  }
}))

app.use(router)

app.use(errorLogger({
  transports: transports,
  format: winston.format.combine(
    winston.format.json()
  )
}))

export default app
