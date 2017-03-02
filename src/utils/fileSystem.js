const os = require('os')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const jsonLoader = require('load-json-file')
const promisify = require('es6-promisify')
const { mergeAllObjects } = require('./objects')
const { sequence } = require('./promises')


const pathToActions = path.join(__dirname, '..', 'actions')
const pathToPrefs = path.join(os.homedir(), '.donna-cli/')

const getGlobalNodePath = () => new Promise((resolve, reject) => {
  exec('npm config get prefix', (err, stdout, stderr) => {
    if (err) return reject(err)
    resolve(stdout.trim())
  })
})

const folderExists = path =>
  promisify(fs.stat)(path)
    .then(() => true)
    .catch(() => false)

const importPlugin = (nodePath, pluginName) => new Promise((resolve, reject) => {
  try {
    resolve(require(path.join(nodePath, pluginName)))
  } catch (e) {
    reject(`
      I was not able to get ${pluginName} 😶
    `)
  }
})

const getPlugin = (nodePath, pluginName) =>
  folderExists(path.join(nodePath, pluginName))
    .then(exists => exists
      ? importPlugin(nodePath, pluginName)
      : Promise.reject(`
      Hmmm, I don't know the '${pluginName}' plugin yet...
      Maybe you forgot to install it first?
      --> npm i -g ${pluginName}
      `)
    )

const getPluginsActions = () =>
  Promise.all([
    getGlobalNodePath(),
    jsonLoader('donna.json')
      .catch(() => ({}))
      .then(config => config.plugins || [])
  ])
    .then(([nodePath, plugins]) => sequence(plugins.map(p => () => getPlugin(nodePath, p))))
    .then(mergeAllObjects)

const getInternalActions = () => new Promise((resolve, reject) => {
  fs.readdir(pathToActions, (err, files) => {
    if (err) reject('Oups. no actions have been found. That\'s odd.')
    resolve(
      files.reduce((acc, fileName) => Object.assign(acc, {
        [fileName.replace('.js', '')]: require(path.join(pathToActions, fileName))
      }), {})
    )
  })
})

const getActions = () =>
  Promise.all([getInternalActions(), getPluginsActions()]).then(mergeAllObjects)


const getInstructions = () =>
  jsonLoader('donna.json')
    .then(json => Array.isArray(json.do) ? json.do : [])
    .catch(() => Promise.reject(
      'Sorry, there is nothing I can do... Provide me with a valid donna.json file so I can start working.'
    ))


const initialConfig = { do: [] }
const initialBookmarksConfig = { bookmarks: [] }

const writeConfig = config => promisify(fs.writeFile)(
  path.join(process.cwd(), 'donna.json'),
  JSON.stringify(config, null, 2)
)

const writeBookmark = bookmark => promisify(fs.writeFile)(
  path.join(pathToPrefs, 'bookmarks.json'),
  JSON.stringify(bookmark, null, 2)
)

const createConfig = () =>
  jsonLoader('donna.json')
    .then(
      () => Promise.reject(
        'You already have donna.json in you project!'
      ),
      () => writeConfig(initialConfig)
    )

const addCommand = (command) => {
  if (command.length === 0)
    return Promise.reject('You need to specify an argument for that command!')
  else
    return jsonLoader('donna.json')
      .catch(() => initialConfig)
      .then(config => Object.assign({}, config, {
        do: config.do.concat([command])
      }))
      .then(writeConfig)
}

const checkDataFolder = () =>
  new Promise((resolve, reject) => {
    fs.stat(pathToPrefs, (err, stats) => {
      err ? fs.mkdir(pathToPrefs, resolve) : resolve()
    })
  })

const getBookmarks = () =>
  jsonLoader(path.join(pathToPrefs, 'bookmarks.json'))
    .then(file => file.bookmarks.length === 0 ? Promise.reject() : file.bookmarks)
    .catch(() => Promise.reject(`
      You haven\'t added any bookmarks yet!
      You can do so by using the following command :

      --> donna bookmark <projectName>

      Remember you need to cd into the root of your project first 😙
    `))

const addBookmark = (args) => {
  if (args.length === 0)
    return Promise.reject('You need to specify a name for your bookmark!')
  else
    return checkDataFolder()
      .then(() =>
        jsonLoader(path.join(pathToPrefs, 'bookmarks.json'))
          .catch(() => initialBookmarksConfig)
          .then(file => Object.assign({}, file, {
            bookmarks: file.bookmarks
              .filter(bookmark => bookmark.path !== process.cwd())
              .concat({
                path: process.cwd(),
                name: args[0]
              })
          }))
          .then(writeBookmark))
}

const deleteBookmark = (args) => {
  if (args.length === 0)
    return Promise.reject('I need the name of the bookmark to delete!')
  else
    return checkDataFolder()
      .then(() =>
        jsonLoader(path.join(pathToPrefs, 'bookmarks.json'))
          .then(file => {
            const bookmarkToDel = file.bookmarks.filter(bookmark => bookmark.name === args[0])

            if (bookmarkToDel.length === 0)
              return Promise.reject(`
    Ooops! I cannot find any bookmark with that name...
    Try using the following command to list every of your bookmarks :

    --> donna list
              `)
            else
              return Object.assign({}, file, {
                bookmarks: file.bookmarks
                  .filter(bookmark => bookmark.name !== args[0])
              })
          })
          .then(writeBookmark))
}

const launchBookmark = (args) => {
  if (args.length === 0)
    return Promise.reject('How can I launch a project if you don\'t give me it\'s name dummy?!')
  else
    return getBookmarks()
      .then(bookmarks => {
        const bookmarkToLaunch = bookmarks.filter(b => b.name === args[0])
        if (bookmarkToLaunch.length === 0)
          return Promise.reject(`
    ${args} doesn\'t exist as a bookmark.
    Maybe double check if it exists in the list using :

    --> donna list
          `)
        else
          return bookmarkToLaunch[0]
      })
}

module.exports = {
  getActions,
  getInstructions,
  createConfig,
  addCommand,
  addBookmark,
  deleteBookmark,
  launchBookmark,
  getBookmarks
}
