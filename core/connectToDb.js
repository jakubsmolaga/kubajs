module.exports = async options => {
  let { dbName, dbUrl } = options
  let MongoClient = require('mongodb').MongoClient
  let connectOptions = { useNewUrlParser: true, useUnifiedTopology: true }
  let client = await MongoClient.connect(dbUrl, connectOptions)
  let db = client.db(dbName)
  kuba.db = db
}