const fs = require('fs')
const utilsDir = `${__dirname}/../utils`

let readdir = path => new Promise((resolve, reject) =>
  fs.readdir(path, (err, res) => err ? reject(err) : resolve(res))
)

let filenameToCamel = filename => {
  let name = filename.split('.')[0]
  let nameParts = name.split('-')
  let almostCamel = nameParts.map(s => s[0].toUpperCase() + s.substr(1)).join('')
  let camelCase = almostCamel[0].toLowerCase() + almostCamel.substr(1)
  return camelCase
}

let getNames = () => readdir(utilsDir)

let getFunctions = async controller => {
  let names = await readdir(`${utilsDir}/${controller}`)
  let functions = {}
  names.forEach(name => {
    let funcName = filenameToCamel(name)
    let func = require(`${utilsDir}/${controller}/${name}`)
    functions[funcName] = func
  })
  return functions
}

module.exports = async () => {

  let names = await getNames()

  kuba.utils = {}

  for (let i = 0; i < names.length; i++) {
  
    let name = names[i]
    let functions = await getFunctions(name)
    kuba.utils[name] = functions
  
  }

}