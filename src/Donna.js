const { getActions, getInstructions } = require('./utils/fileSystem')
const { sequence } = require('./utils/promises')

const executeInstruction = actions => ([actionName, ...args]) => () => new Promise((resolve, reject) => {
  if (actions[actionName])
    resolve(actions[actionName](...args))
  else
    reject(`Sorry, I dont understand the action "${actionName}" (yet).`)
})

const Donna = () =>
  Promise.all([ getActions(), getInstructions() ])
    .then(([ actions, instructions ]) => sequence(instructions.map(executeInstruction(actions))))

module.exports = Donna
