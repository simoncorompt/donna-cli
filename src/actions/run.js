const path = require('path')
const WindowManager = require('../utils/window-manager')
var exec = require('child_process').exec;

const run = args => new Promise((resolve, reject) => {
  if (args.cmd)
    WindowManager.run(`${args.cmd}`, resolve)
  else
    reject('You need to specify an command to run!')
})

module.exports = run
