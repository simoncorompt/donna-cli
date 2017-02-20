const cmd = require('node-cmd')
const { spawnSync } = require('child_process')

const WindowManager = {

  activate(appName) {
    cmd.run(`osascript -e 'tell application "${appName}" to activate'`)
  },

  // newTab(appName, command) {
  //   this.activate(appName)
  //   const newTabCommand = command ? `-e 'tell application "Terminal" to do script with command "${command}" in front window'` : ''
  //   cmd.run(`osascript -e 'tell application "System Events" to keystroke "t" using {command down}' ${newTabCommand}`)
  // },

  run(command, callback = _ => _) {
    const [cmdName, ...args] = command.split(' ')
    const spawned = spawnSync(cmdName, args, { stdio: 'inherit' })
    callback()
  },

  runAsync(command, callback = _ => _) {
    this.activate('Terminal')
    cmd.get(`osascript -e 'tell application "Terminal" to do script with command "${command}" in front window'`, callback)
  },

  runHidden(command, callback = _ => _) {
    cmd.get(command, callback)
  }
}
module.exports = WindowManager
