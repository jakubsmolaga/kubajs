const fs = require('fs')
let modelsDir = `${__dirname}/../models`

let readdir = path => new Promise((resolve, reject) =>
  fs.readdir(path, (err, res) => err ? reject(err) : resolve(res))
)

let getNames = () => readdir(modelsDir)
let getCollectionName = modelName => modelName.toLowerCase() + 's'

let validate = (model, obj) => {
  for (let property in model) {
    let expectedType = typeof model[property]
    let foundType = typeof obj[property]
    if (foundType != expectedType)
      throw new Error(`Model validation failed for property ${property}.
      expected type ${expectedType} but found value ${obj[property]} of type ${foundType}`)
  }
}

let addOne = async (collection, obj) => {
  let res = await collection.insertOne(obj)
  return res.ops[0]
}

let buildModel = modelName => {
  let model = require(`${modelsDir}/${modelName}`)
  let collectionName = getCollectionName(modelName)
  let collection = kuba.db.collection(collectionName)
  return {
    model,
    isOk: obj => {
      try {
        validate(model, obj)
        return true
      }catch(error){
        return false
      }
    },
    addOne: async obj => {
      validate(model, obj)
      return addOne(collection, obj)
    }
  }

}

module.exports = async () => {
  let models = await getNames()
  for (let i = 0; i < models.length; i++){
    let modelName = models[i].split('.')[0]
    kuba[modelName] = await buildModel(modelName)
  }
}