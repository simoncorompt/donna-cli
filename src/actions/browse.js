const open = require('open')

const addProtocol = str => str.replace(/^(?!.*:\/\/)/, 'http://')

const url = (url, browser) => new Promise((resolve, reject) => {
  if (url)
    resolve(open(addProtocol(url), browser))
  else
    reject('You need to specify a url!')
})

module.exports = url
