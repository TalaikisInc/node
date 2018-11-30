import cluster from 'cluster'
import { cpus } from 'os'

import { log, app } from './utils'
import config from './config'
const numCPUs = cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('online', (worker) => {
    log(`Worker is running on ${worker.process.pid} pid`)
  })

  cluster.on('exit', (worker, code, signal) => {
    log(`Worker ${worker.process.pid} is closed on`)
  })
} else if (cluster.isWorker) {
  app.listen(config.API_PORT, () => {
    log(`Server listening on port ${config.API_PORT}`)
  })
}
