import { deepEqual } from 'assert'
import { join } from 'path'
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
require('dotenv').config({ path: join(__dirname, `../.env.${NODE_ENV}`) })
const API_PORT = process.env.API_PORT
const DB_URI = process.env.DB_URI
deepEqual(typeof API_PORT, 'string')
deepEqual(typeof DB_URI, 'string')

const config = {
  API_PORT,
  DB_URI
}

export default config
