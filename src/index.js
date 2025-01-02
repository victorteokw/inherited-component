const { createElement } = require('react')
const { mergeProps } = require('react-merge-props')

function removeUnforwardableProps(props, unforwardables) {
  const result = {}
  for (const key in props) {
    if (!unforwardables.includes(key)) {
      result[key] = props[key]
    }
  }
  return result
}

function removeTransientProps(props) {
  const result = {}
  for (const key in props) {
    if (!key.startsWith("$")) {
      result[key] = props[key]
    }
  }
  return result
}

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

function extractInterleaved(literals, functions) {
  return function(props) {
    const literalsCopy = [...literals]
    const functionsCopy = [...functions]
    const slices = []
    while (true) {
      const literal = literalsCopy.shift()
      if (literal !== undefined) {
        slices.push(literal)
      }
      const func = functionsCopy.shift()
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
    const literals = [...taggedOrFunction[0]]
    const functions = [...taggedOrFunction.slice(1)]
    const classNameExtractor = extractInterleaved(literals, functions)
    return (props) => ({ className: classNameExtractor(props) })
  }
}

function originalInherited(parent) {
  return inheritedCreator(parent)
}

function inheritedCreator(parent, filterTransientProps = false) {
  return function(propsOrFunction, config) {
    const propsExtractor = extractorFromFunctionOrObject(propsOrFunction)
    const component = function (props) {
      props = mergeProps(propsExtractor(props), props)
      if (config && config.unforwardableProps) {
        props = removeUnforwardableProps(props, config.unforwardableProps)
      }
      return createElement(parent, filterTransientProps ? removeTransientProps(props) : props)
    }
    return component
  }
}

const inherited = new Proxy(originalInherited, {
  get(_target, name, _receiver) {
    return inheritedCreator(name, true)
  }
})

function originalClassed(parent) {
  return classedCreator(parent)
}

function classedCreator(parent, filterTransientProps = false) {
  return function(...args) {
    const [taggedOrFunction, config] = typeof args[0] === 'function' ? [args[0], args[1]] : [args, undefined]
    const propsExtractor = extractorFromTaggedOrFunction(taggedOrFunction)
    const component = function (props) {
      props = mergeProps(propsExtractor(props), props)
      if (config && config.unforwardableProps) {
        props = removeUnforwardableProps(props, config.unforwardableProps)
      }
      return createElement(parent, filterTransientProps ? removeTransientProps(props) : props)
    }
    return component
  }
}

const classed = new Proxy(originalClassed, {
  get(_target, name, _receiver) {
    return classedCreator(name, true)
  }
})

module.exports = { classed, inherited }
