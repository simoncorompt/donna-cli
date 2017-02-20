const sequence = promises =>
  promises.reduce((acc, getPromise) =>
    acc.then(xs => getPromise().then(x => xs.concat([x]))),
    Promise.resolve([])
  )

module.exports = {
  sequence
}
