const { getActions, getInstructions } = require('./utils/fileSystem')
const { sequence } = require('./utils/promises')

const executeInstruction = actions => instruction => new Promise((resolve, reject) => {
  if (actions[instruction.action])
    resolve(actions[instruction.action](instruction.args))
  else
    reject(`Sorry, I dont understand the action "${instruction.action}" (yet).`)
})

const Donna = () =>
  Promise.all([ getActions(), getInstructions() ])
    .then(([ actions, instructions ]) => sequence(instructions.map(executeInstruction(actions))))

module.exports = Donna
