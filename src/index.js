#!/usr/bin/env node --harmony
const Donna = require('./Donna')

Donna()
  .then(() => console.log('I\'m all done!'))
  .catch(console.log)
