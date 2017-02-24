const WindowManager = require('../utils/window-manager')
const path = require('path')

const addPath = file => file ? path.join(process.cwd(), file) : ''

const open = (app, file = '') => new Promise((resolve, reject) => {
  if (app)
    WindowManager.runHidden(`open -a '${app}' ${addPath(file)}`, resolve)
  else
    reject('You need to specify an app!')
})

module.exports = open
