import test from 'ava'
import { createElement, DetailedHTMLProps, HTMLAttributes } from 'react'
import { renderToString } from 'react-dom/server'
import { withProps, withClasses } from '..'

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

test("withClasses transforms components", (t) => {
  const transform = withClasses`foo bar`
  const base = (props: DivProps) => createElement('div', props)
  const transformed = transform(base)
  const element = createElement(transformed, { "id": "d" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar" id="d"></div>')
})

test("withClasses transforms string components", (t) => {
  const transform = withClasses`foo bar`
  const transformed = transform.div
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("withProps transforms components", (t) => {
  const transform = withProps({ id: "foo" })
  const base = (props: DivProps) => createElement('div', props)
  const transformed = transform(base)
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div id="foo"></div>')
})

test("withProps transforms string components", (t) => {
  const transform = withProps({ id: "foo" })
  const transformed = transform.div
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div id="foo"></div>')
})

// test("withProps transforms components with additional props", (t) => {
//   const transform = withProps<{ foo: string, id?: string }, HTMLProps<HTMLDivElement>>((props) => ({
//     "id": props.foo
//   }))
//   const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
//   const transformed = transform(base)
//   const element = createElement(transformed, { "foo": "foo", "className": "8" })
//   const result = renderToString(element)
//   t.is(result, '<div id="foo"></div>')
// })
