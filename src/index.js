import cors from 'cors'
import express from 'express'
import { json } from 'body-parser'

import { log } from './utils'
import config from './config'
const app = express()

app.use(json())
app.use(cors())
app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.listen(config.port, () => {
  log(`Server listening on port ${config.port}`)
})
