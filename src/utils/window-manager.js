const cmd = require('node-cmd')

const WindowManager = {

  activate(appName) {
    cmd.run(`osascript -e 'tell application "${appName}" to activate'`)
  },

  // newTab(appName, command) {
  //   this.activate(appName)
  //   const newTabCommand = command ? `-e 'tell application "Terminal" to do script with command "${command}" in front window'` : ''
  //   cmd.run(`osascript -e 'tell application "System Events" to keystroke "t" using {command down}' ${newTabCommand}`)
  // },

  run(command) {
    this.activate('Terminal')
    cmd.run(`osascript -e 'tell application "Terminal" to do script with command "${command}" in front window'`)
  }

}
module.exports = WindowManager
