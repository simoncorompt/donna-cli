const { getActions, getInstructions, createConfig, addCommand } = require('./utils/fileSystem')
const { sequence } = require('./utils/promises')


const executeInstruction = actions => ([actionName, ...args]) => () => new Promise((resolve, reject) => {
  if (actions[actionName])
    resolve(actions[actionName](...args))
  else
    reject(`Sorry, I dont understand the action "${actionName}" (yet).`)
})


const execute = () =>
  Promise.all([ getActions(), getInstructions() ])
    .then(([actions, instructions]) => sequence(instructions.map(executeInstruction(actions))))
    .then(() => console.log('I\'m all done!'))


const init = () =>
  createConfig()
    .then(() => console.log('Your donna.json has been created!'))

const add = (...args) =>
  addCommand(args)
    .then(() => console.log('Instruction added!', args))


const help = () => Promise.resolve(
  console.log(`
    donna --> execute your commands

    donna init --> create your donna.json

    donna add <action> <args> --> add an instruction
            - open <appName> <fileName (optional)>
            - run <any bash command>
            - browse <url> <browser (optional)>
            - sleep <seconds>
  `)
)


module.exports = {
  default: execute,
  init,
  add,
  help
}
