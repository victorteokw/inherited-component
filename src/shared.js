function removeTransientProps(props) {
  const result = {}
  for (const key in props) {
    if (!key.startsWith("$")) {
      result[key] = props[key]
    }
  }
  return result
}

function removeUnforwardableProps(props, unforwardables) {
  const result = {}
  for (const key in props) {
    if (!unforwardables.includes(key)) {
      result[key] = props[key]
    }
  }
  return result
}

module.exports = { removeTransientProps, removeUnforwardableProps }
