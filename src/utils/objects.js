const mergeAllObjects = objects => objects.reduce(
  (acc, object) => Object.assign(acc, object), {}
)


module.exports = {
  mergeAllObjects,
}
