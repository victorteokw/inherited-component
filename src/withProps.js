const { inherited } = require('./inherited')

function withProps(...args) {
  const originalTransformer = function (component) {
    return inherited(component)(...args)
  }
  return new Proxy(originalTransformer, {
    get(_target, name, _receiver) {
      return inherited[name](...args)
    }
  })
}

module.exports = { withProps }
