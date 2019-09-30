const chalk = require('chalk')
let loadingInterval

let logHelper = (_args, color, symbol) => {
  let args = Array.prototype.slice.call(_args)
  if (loadingInterval) {
    clearInterval(loadingInterval)
    symbol = '\r' + symbol
  }
  console.log(chalk[color].apply(null, [symbol + ' ', ...args]))
}

module.exports = () => {
  kuba.log = console.log
  kuba.log.error = function () {
    logHelper(arguments, 'red', '✖')
  }
  kuba.log.ok = function () {
    logHelper(arguments, 'green', '✔')
  }
  kuba.log.warn = function () {
    logHelper(arguments, 'yellow', '⚠')
  }
  kuba.log.info = function () {
    logHelper(arguments, 'blue', 'ℹ')
  }
  kuba.log.process = text => {
    var P = ["\\", "|", "/", "-"]
    var R = ['   ', '.  ', '.. ', '...']
    var x = 0
    loadingInterval = setInterval(function () {
      process.stdout.write("\r" + P[x] + ' ' + text + R[x])
      x++
      x &= 3
    }, 100)
  }
}