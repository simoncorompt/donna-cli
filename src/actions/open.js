const WindowManager = require('../utils/window-manager')
const path = require('path')

const open = args => new Promise((resolve, reject) => {
  const file = args.file ? path.join(process.cwd(), args.file) : ''

  if (args.app)
    WindowManager.runHidden(`open -a '${args.app}' ${file}`, resolve)
  else
    reject('You need to specify an app!')
})

module.exports = open
