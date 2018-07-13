'use strict'

/**
 * Core cluster logic.
 */

const cluster = require('cluster'),
  c = require('../cluster.config')

module.exports = {

  createHttpCluster: () => {
    if (cluster.isMaster) {
      let cpuCount = require('os').cpus().length
      if (c.workers !== null) cpuCount = c.workers
      for (let i = 0; i < cpuCount; i++) {
        cluster.fork()
      }
      cluster.on('fork', worker => {
        console.log(`Worker %d created: ${worker.id}`)
      }).on('exit', (worker) => {
        console.error(`Worker %d died: ${worker.id}`)
        cluster.fork()
      })
    } else require('./http').createHttpServer(c.port)
  }

}