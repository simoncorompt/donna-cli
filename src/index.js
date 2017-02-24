#!/usr/bin/env node --harmony
const Donna = require('./Donna')

const [cmd = 'default', ...args] = process.argv.slice(2)

if (Donna[cmd]) {
  Donna[cmd](...args).catch(console.log)
} else {
  Donna.help()
}
