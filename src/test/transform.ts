import test from 'ava'
import { createElement, HTMLProps } from 'react'
import { renderToString } from 'react-dom/server'
import { withProps, withClasses } from '..'

test("withClasses transforms components", (t) => {
  const transform = withClasses<HTMLProps<HTMLDivElement>>`foo bar`
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const transformed = transform(base)
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("withClasses transforms string components", (t) => {
  const transform = withClasses<HTMLProps<HTMLDivElement>>`foo bar`
  const transformed = transform("div")
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("withProps transforms components", (t) => {
  const transform = withProps<HTMLProps<HTMLDivElement>>({ id: "foo" })
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const transformed = transform(base)
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div id="foo"></div>')
})

test("withProps transforms string components", (t) => {
  const transform = withProps<HTMLProps<HTMLDivElement>>({ id: "foo" })
  const transformed = transform("div")
  const element = createElement(transformed)
  const result = renderToString(element)
  t.is(result, '<div id="foo"></div>')
})
