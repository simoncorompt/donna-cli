const cmd = require('node-cmd')
const path = require('path')

const open = args => {

  const file = args.file ? path.join(process.cwd(), args.file) : ''

  if (args.app)
    cmd.run(`open -a '${args.app}' ${file}`)
  else
    console.log('You need to specify an app!')

}

module.exports = open
