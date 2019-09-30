module.exports.start = async options => {
  let port = options.port || 3000
  let dbUrl = options.dbUrl || 'mongodb://localhost:27017'
  let dbName = options.dbName || 'kuba'

  global.kuba = {}
  require('./loadLogger')()
  try {
    kuba.log.process('Loading kuba.js')
    kuba.app = require('express')()
    kuba.app.use((req, res, next) => {
      console.log(res.statusCode)
      next()
    })
    await require('./loadUtils')()
    await require('./loadRoutes')()
    await require('./connectToDb')({ dbUrl, dbName })
    await require('./loadModels')()
  } catch (error) {
    kuba.log.error('Server Failed to start! Reason:', error.message)
    return error
  }

  kuba.app.listen(port, () =>
    kuba.log.ok(`Server successfully started on port ${port}`)
  )
}