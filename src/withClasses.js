const { classed } = require('./classed')

function withClasses(...args) {
  return function (component) {
    if (typeof component === 'string') {
      return classed[component](...args)
    } else {
      return classed(component)(...args)
    }
  }
}

module.exports = { withClasses }
