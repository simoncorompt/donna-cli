const path = require('path')
const WindowManager = require('../utils/window-manager')

const run = args => new Promise((resolve, reject) => {
  if (args.cmd) {
    if (args.background)
      WindowManager.runAsync(`${args.cmd}`, resolve)
    else
      WindowManager.run(`${args.cmd}`, resolve)
  } else {
    reject('You need to specify an command to run!')
  }
})

module.exports = run
