const React = require('react')
const mergeProps = require('react-merge-props')

function classed(parent, className, attrs = undefined) {
  const parentDefaultAttrs = parent.defaultAttrs ?? { }
  const componentDefaultAttrs = mergeProps(parentDefaultAttrs, attrs, { className })
  const component = function (props) {
    return createElement(component, mergeProps(componentDefaultAttrs, props))
  }
  component.defaultAttrs = componentDefaultAttrs
  return component
}

module.exports = classed
