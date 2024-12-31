const { createElement } = require('react')
const { mergeProps } = require('react-merge-props')

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

function extractInterleaved(staticLiterals, functions) {
  return function(props) {
    const slices = []
    while (true) {
      const literal = staticLiterals.shift()
      if (literal !== undefined) {
        slices.push(literal)
      }
      const func = functions.shift()
      if (func !== undefined) {
        slices.push(func(props))
      }
      if (literal === undefined && func === undefined) {
        break
      }
    }
    return slices.map((s) => s.trim()).join(" ")
  }
}

function extractorFromTaggedOrFunction(taggedOrFunction) {
  if (typeof taggedOrFunction === 'function') {
    return (props) => ({ className: taggedOrFunction(props) })
  } else {
    const staticLiterals = [...taggedOrFunction[0]]
    const functions = [...taggedOrFunction.slice(1)]
    const classNameExtractor = extractInterleaved(staticLiterals, functions)
    return (props) => ({ className: classNameExtractor(props) })
  }
}

function originalInherited(parent) {
  return inheritedCreator(parent)
}

function inheritedCreator(parent) {
  return function(propsOrFunction) {
    const propsExtractor = extractorFromFunctionOrObject(propsOrFunction)
    const component = function (props) {
      return createElement(parent, mergeProps(propsExtractor(props), props))
    }
    component.propsExtractor = propsExtractor
    return component
  }
}

const inherited = new Proxy(originalInherited, {
  get(_target, name, _receiver) {
    return inheritedCreator(name)
  }
})

function originalClassed(parent) {
  return classedCreator(parent)
}

function classedCreator(parent) {
  return function(...args) {
    const taggedOrFunction = typeof args[0] === 'function' ? args[0] : args
    const propsExtractor = extractorFromTaggedOrFunction(taggedOrFunction)
    const component = function (props) {
      return createElement(parent, mergeProps(propsExtractor(props), props))
    }
    component.propsExtractor = propsExtractor
    return component
  }
}

const classed = new Proxy(originalClassed, {
  get(_target, name, _receiver) {
    return classedCreator(name)
  }
})

module.exports = { classed, inherited }
