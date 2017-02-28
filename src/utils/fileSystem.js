const fs = require('fs')
const path = require('path')
const jsonLoader = require('load-json-file')
const promisify = require('es6-promisify')

const pathToActions = path.join(__dirname, '..', 'actions')

const getActions = () => new Promise((resolve, reject) => {
  fs.readdir(pathToActions, (err, files) => {
    if (err) reject('Oups. no actions have been found. That\'s odd.')
    resolve(
      files.reduce((acc, fileName) => Object.assign(acc, {
        [fileName.replace('.js', '')]: require(path.join(pathToActions, fileName))
      }), {})
    )
  })
})

const getInstructions = () =>
  jsonLoader('donna.json')
    .then(json => Array.isArray(json.do) ? json.do : [])
    .catch(() => Promise.reject(
      'Sorry, there is nothing I can do... Provide me with a valid donna.json file so I can start working.'
    ))


const initialConfig = { do: [] }

const writeConfig = config => promisify(fs.writeFile)(
  path.join(process.cwd(), 'donna.json'),
  JSON.stringify(config, null, 2)
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



module.exports = {
  getActions,
  getInstructions,
  createConfig,
  addCommand
}
