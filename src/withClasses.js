const { classed } = require('./classed')

function withClasses(...args) {
  const originalTransformer = function (component) {
    return classed(component)(...args)
  }
  return new Proxy(originalTransformer, {
    get(_target, name, _receiver) {
      return classed[name](...args)
    }
  })
}

module.exports = { withClasses }
