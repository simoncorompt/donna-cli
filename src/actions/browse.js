const open = require('open')

const url = args => new Promise((resolve, reject) => {
  if (args.url)
    resolve(open(args.url, args.browser))
  else
    reject('You need to specify a url!')
})

module.exports = url
