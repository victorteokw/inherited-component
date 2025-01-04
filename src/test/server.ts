import test from 'ava'
import { createElement, HTMLProps } from 'react'
import { renderToString } from 'react-dom/server'
import { classed, inherited } from '..'

test("classed for HTML component", (t) => {
  const component = classed.div`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("classed for React component", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = classed(base)`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("classed for classed component", (t) => {
  const base = classed.div`baz`
  const component = classed(base)`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="baz foo bar"></div>')
})

test("classed for classed component with multiple inheritances", (t) => {
  const base0 = classed.div`foo0`
  const base1 = classed(base0)`foo1`
  const base = classed(base1)`foo2`
  const component = classed(base)`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 foo bar"></div>')
})

test("classed for HTML component with props", (t) => {
  const component = classed.div<{ arg: string }>((props) => `foo bar ${props.arg}`, {
    unforwardableProps: ['arg']
  })
  const element = createElement(component, { arg: "baz" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar baz"></div>')
})

test("classed for React component with props", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = classed(base)<{ arg: string }>((props) => `foo ${props.arg}`, {
    unforwardableProps: ['arg']
  })
  const element = createElement(component, { arg: "bar" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("classed for classed component with props", (t) => {
  const base = classed.div<{ base: string }>((props) => `foo ${props.base}`, {
    unforwardableProps: ['base']
  })
  const component = classed(base)<{ arg: string }>(
    (props) => `bar ${props.arg}`,
    { unforwardableProps: ['arg'] }
  )
  const element = createElement(component, { base: "base", arg: "arg" })
  const result = renderToString(element)
  t.is(result, '<div class="foo base bar arg"></div>')
})

test(
  "classed for classed component with props, with multiple inheritances",
  (t) => {
  const base0 = classed.div<{ base0: string }>(
    (props) => `${props.base0}`,
    { unforwardableProps: ['base0'] })
  const base1 = classed(base0)<{ base1: string }>((props) => `${props.base1}`, {
    unforwardableProps: ['base1']
  })
  const base = classed(base1)<{ base2: string }>((props) => `${props.base2}`, {
    unforwardableProps: ['base2']
  })
  const component = classed(base)<{ arg: string }>((props) => `bar ${props.arg}`, {
    unforwardableProps: ['arg']
  })
  const element = createElement(component, {
    base0: "foo0", base1: "foo1", base2: "foo2", arg: "arg"
  })
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 bar arg"></div>')
})

test("inherited for HTML component", (t) => {
  const component = inherited.div({ id: 'value0' })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div id="value0"></div>')
})

test("inherited for React component", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = inherited(base)({ id: 'value0' })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div id="value0"></div>')
})

test("inherited for inherited component", (t) => {
  const base = inherited.div({ id: 'value0' })
  const component = inherited(base)({ className: 'value1' })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div id="value0" class="value1"></div>')
})

test("inherited for inherited component with multiple inheritances", (t) => {
  const base0 = inherited.div({ className: "foo0" })
  const base1 = inherited(base0)({ className: "foo1" })
  const base = inherited(base1)({ className: "foo2" })
  const component = inherited(base)({ className: "foo bar" })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 foo bar"></div>')
})

test("inherited for HTML component with props", (t) => {
  const component = inherited.div<{ key0: string }>(
    (props) => ({ id: props.key0 }),
    { unforwardableProps: ['key0'] })
  const element = createElement(component, { key0: 'value0' })
  const result = renderToString(element)
  t.is(result, '<div id="value0"></div>')
})

test("inherited for React component with props", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = inherited(base)<{key0: string}>(
    (props) => ({ id: props.key0 }),
    { unforwardableProps: ['key0'] })
  const element = createElement(component, { key0: 'value0' })
  const result = renderToString(element)
  t.is(result, '<div id="value0"></div>')
})

test("inherited for inherited component with props", (t) => {
  const base = inherited.div<{ key0: string }>(
    (props) => ({ id: props.key0 }),
    { unforwardableProps: ['key0'] })
  const component = inherited(base)<{ key1: string }>(
    (props) => ({ className: props.key1 }),
    { unforwardableProps: ['key1'] })
  const element = createElement(component, { key0: 'value0', key1: 'value1' })
  const result = renderToString(element)
  t.is(result, '<div id="value0" class="value1"></div>')
})

test(
  "inherited for inherited component with props, with multiple inheritances",
  (t) => {
  const base0 = inherited.div<{ foo0: string }>(
    (props) => ({ className: props.foo0 }),
    { unforwardableProps: ['foo0'] })
  const base1 = inherited(base0)<{ foo1: string }>(
    (props) => ({ className: props.foo1 }),
    { unforwardableProps: ['foo1'] })
  const base = inherited(base1)<{ foo2: string }>(
    (props) => ({ className: props.foo2 }),
    { unforwardableProps: ['foo2'] })
  const component = inherited(base)<{ arg: string }>(
    (props) => ({ className: props.arg }),
    { unforwardableProps: ['arg'] })
  const element = createElement(component, {
    foo0: "foo0", foo1: "foo1", foo2: "foo2", arg: "bar"
  })
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 bar"></div>')
})

test("classed with unforwardable props", (t) => {
  const component = classed.div<{ foo0: string }>(
    (props) => `${props.foo0}`,
    { unforwardableProps: ['foo0']})
  const element = createElement(component, { "foo0": "flex" })
  const result = renderToString(element)
  t.is(result, '<div class="flex"></div>')
})

test("inherited with unforwardable props", (t) => {
  const component = inherited.div<{ foo0: string }>(
    (props) => ({ className: props.foo0 }), { unforwardableProps: ['foo0'] })
  const element = createElement(component, { "foo0": "flex" })
  const result = renderToString(element)
  t.is(result, '<div class="flex"></div>')
})
