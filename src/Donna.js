const jsonLoader = require('load-json-file')
const actions = require('./actions')

class Donna {
  constructor() {
    this.start()
  }

  start() {
    this.loadConfig()
  }

  loadConfig() {

    jsonLoader('donna.json').then(json => {
      const instructions = json.instructions

      if (instructions)
        instructions.map(instruction => this.execute(instruction.action, instruction.args))

    }).catch(err => {
      console.log('Sorry, there is nothing I can do... Provide me with a valid donna.json file so I can start working.')
    })

  }

  execute(action, args) {
    if (actions[action])
      actions[action](args)
    else
      console.log(`Sorry, I dont understand the action "${action}" (yet).`)
  }
}

module.exports = Donna
