const cmd = require('node-cmd')
const path = require('path')

const open = args => new Promise((resolve, reject) => {
  const file = args.file ? path.join(process.cwd(), args.file) : ''

  if (args.app)
    resolve(cmd.run(`open -a '${args.app}' ${file}`))
  else
    reject('You need to specify an app!')
})

module.exports = open
