module.exports = async () => {
  let routes = require(`${__dirname}/../config/routes`)

  for (let route in routes) {
    let [method, path] = route.split(' ')
    let controllerPath = routes[route]
    let controller = require(`${__dirname}/../controllers/${controllerPath}`)
    kuba.app[method](path, async (req, res) => {
      try {
        return await controller(req, res)
      } catch (error) {
        console.log('Server Error Occured!:', error)
        return res.status(500).json(error.message)
      }
    })
  }
}