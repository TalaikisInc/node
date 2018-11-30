import { log, app } from './utils'
import config from './config'

app.listen(config.API_PORT, () => {
  log(`Server listening on port ${config.API_PORT}`)
})
