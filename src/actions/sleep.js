module.exports = time => new Promise(resolve => setTimeout(resolve, parseInt(time) * 1000))
