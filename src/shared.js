function removeUnforwardableProps(props, unforwardables) {
  const result = {}
  for (const key in props) {
    if (!unforwardables.includes(key)) {
      result[key] = props[key]
    }
  }
  return result
}

module.exports = { removeUnforwardableProps }
