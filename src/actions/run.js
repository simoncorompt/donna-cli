const path = require('path')
const WindowManager = require('../utils/window-manager')
var exec = require('child_process').exec;


const run = args => {

  if (args.cmd)
    WindowManager.run(`${args.cmd}`)
  else
    console.log('You need to specify an command to run!')

}

module.exports = run
