import monk from 'monk'
import config from '../../config'

const db = monk(config.DB_URI, (err) => {
  if (err) {
    error(err)
    process.exit(1)
  }
})

export default db
