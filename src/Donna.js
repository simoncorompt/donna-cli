const { getActions, getInstructions, createConfig, addCommand, addBookmark, deleteBookmark, getBookmarks, launchBookmark } = require('./utils/fileSystem')
const { sequence } = require('./utils/promises')
const WindowManager = require('./utils/window-manager')

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

const bookmark = (...args) =>
  addBookmark(args)
    .then(() => console.log('Bookmark added!'))

const list = () =>
  getBookmarks()
    .then(bookmarks => bookmarks.map(bookmark =>
      console.log(`${bookmark.name} --> ${bookmark.path}`)))

const remove = (...args) =>
  deleteBookmark(args)
    .then(() => console.log('Bookmark deleted!'))

const launch = (...args) =>
  launchBookmark(args)
    .then(bookmark => WindowManager.runAsync(`cd ${bookmark.path} && donna`))

const help = () => Promise.resolve(
  console.log(`
    donna --> execute your commands

    donna init --> create your donna.json

    donna add <action> <args> --> add an instruction
            - open <appName> <fileName (optional)>
            - run <any bash command>
            - browse <url> <browser (optional)>
            - sleep <seconds>

    donna bookmark <projectName> --> bookmark a project for global use

    donna remove <projectName> --> delete a bookmark

    donna list --> list all available bookmarks

    donna launch <projectName> --> launch a bookmarked project

  `)
)


module.exports = {
  default: execute,
  init,
  add,
  bookmark,
  remove,
  list,
  launch,
  help
}
