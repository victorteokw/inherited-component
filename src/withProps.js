const { inherited } = require('./inherited')

function withProps(...args) {
  return function (component) {
    if (typeof component === 'string') {
      return inherited[component](...args)
    } else {
      return inherited(component)(...args)
    }
  }
}

module.exports = { withProps }
