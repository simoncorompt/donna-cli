const path = require('path')
const WindowManager = require('../utils/window-manager')

const run = (cmd, background) => new Promise((resolve, reject) => {
  if (cmd) {
    if (background)
      WindowManager.runAsync(`${cmd}`, resolve)
    else
      WindowManager.run(`${cmd}`, resolve)
  } else {
    reject('You need to specify an command to run!')
  }
})

module.exports = run
