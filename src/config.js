import { join } from 'path'
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
require('dotenv').config({ path: join(__dirname, `../.env.${NODE_ENV}`) })

const config = {
  port: process.env.API_PORT
}

export default config
