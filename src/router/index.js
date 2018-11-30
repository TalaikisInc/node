import { Router } from 'express'
import cache from 'express-redis-cache'
import config from '../config'

const router = Router()

router.get('/ping', (req, res, next) => {
  const action = req.body.action
  res.express_redis_cache_name = action
  next()
}, cache(config.REDIS).route(), (req, res) => {
  res.send({ hello: 'world' })
})

router.post('/', (req, res, next) => {
  const action = req.body.action
  if (typeof action === 'string') {
    res.express_redis_cache_name = action
  } else {
    res.end(400)
  }
  next()
}, cache(config.REDIS).route(), (req, res) => {
  // @TODO implement actions + handlers
  res.send({ hello: 'world' })
})

router.get('/status', require('../middleware/status.js'))

export default router
