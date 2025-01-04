const { createElement } = require('react')
const { mergeProps } = require('react-merge-props')
const { removeUnforwardableProps } = require('./shared')

function createStaticExtractor(props) {
  return function() {
    return props
  }
}

function extractorFromFunctionOrObject(propsOrFunction) {
  if (typeof propsOrFunction === 'function') {
    return propsOrFunction
  } else {
    return createStaticExtractor(propsOrFunction)
  }
}

function originalInherited(parent) {
  return inheritedCreator(parent)
}

function inheritedCreator(parent) {
  return function(propsOrFunction, config) {
    const propsExtractor = extractorFromFunctionOrObject(propsOrFunction)
    const component = function (props) {
      props = mergeProps(propsExtractor(props), props)
      if (config && config.unforwardableProps) {
        props = removeUnforwardableProps(props, config.unforwardableProps)
      }
      return createElement(parent, props)
    }
    return component
  }
}

const inherited = new Proxy(originalInherited, {
  get(_target, name, _receiver) {
    return inheritedCreator(name)
  }
})

module.exports = { inherited }
