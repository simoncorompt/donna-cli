const sequence = promises =>
  promises.reduce((acc, promise) =>
    acc.then(xs => promise.then(x => xs.concat([x]))),
    Promise.resolve([])
  )

module.exports = {
  sequence
}
