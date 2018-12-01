import { loadavg, freemem, hostname } from 'os'
import { exec } from 'child_process'
import async from 'async'
const startedAt = new Date()

module.exports = (req, res, next) => {
  const server = req.app
  if (req.param('info')) {
    const connections = {}
    let swap
    async.parallel([
      (done) => {
        exec('netstat -an | grep :80 | wc -l', (e, res) => {
          connections['80'] = parseInt(res,10)
          done()
        })
      },
      (done) => {
        exec(`netstat -an | grep : ${server.set('port')} | wc -l`,
          (e, res) => {
            connections[server.set('port')] = parseInt(res,10)
            done()
          })
      },
      (done) => {
        exec('vmstat -SM -s | grep "used swap" | sed -E "s/[^0-9]*([0-9]{1,8}).*/1/"', (e, res) => {
          swap = res
          done()
        })
      }], (e) => {
      res.send({
        status: 'up',
        version: server.get('version'),
        sha: server.get('git sha'),
        started_at: startedAt,
        node: {
          version: process.version,
          memoryUsage: `${Math.round(process.memoryUsage().rss / 1024 / 1024)}M`,
          uptime: process.uptime()
        },
        system: {
          loadavg: loadavg(),
          freeMemory: `${Math.round(freemem() / 1024 / 1024)}M`
        },
        env: process.env.NODE_ENV,
        hostname: hostname(),
        connections: connections,
        swap
      })
    })
  } else {
    res.send({ status: 'up' })
  }
}
