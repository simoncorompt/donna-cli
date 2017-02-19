const fs = require('fs')
const path = require('path')
const jsonLoader = require('load-json-file')

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
    .then(json => Array.isArray(json.instructions) ? json.instructions : [])
    .catch(() => Promise.reject(
      'Sorry, there is nothing I can do... Provide me with a valid donna.json file so I can start working.'
    ))

module.exports = {
  getActions,
  getInstructions
}
