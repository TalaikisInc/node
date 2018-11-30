import { deepStrictEqual } from 'assert'
import { join } from 'path'
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
require('dotenv').config({ path: join(__dirname, `../.env.${NODE_ENV}`) })
const API_PORT = process.env.API_PORT
const DB_URI = process.env.DB_URI
deepStrictEqual(typeof API_PORT, 'string')
deepStrictEqual(typeof DB_URI, 'string')

const redisDev = {
  host: process.env.REDIS_HOST, port: 6379, auth_pass: process.env.REDIS_PASSWORD
}

const redisProd = {
  host: process.env.REDIS_HOST, port: 6379, auth_pass: process.env.REDIS_PASSWORD
}

const REDIS = process.env.NODE_ENV === 'production' ? redisProd : redisDev

const config = {
  API_PORT,
  DB_URI,
  REDIS
}

export default config
