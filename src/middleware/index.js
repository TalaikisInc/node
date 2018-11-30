import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import StatsD from 'node-statsd'
import helmet from 'helmet'
import errorhandler from 'errorhandler'
import compression from 'compression'

const stats = new StatsD()
const app = express()

stats.socket.on('error', (error) => {
  console.error(error.stack)
})

app.use(errorhandler())

app.use(compression())

app.use(json())

app.use(cors({
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  'optionsSuccessStatus': 204
}))

app.use(helmet())

export default app
