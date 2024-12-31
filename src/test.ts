import { classed, inherited } from '.'
import { createElement, HTMLProps } from 'react'
import { renderToString } from 'react-dom/server'
import test from 'ava'

test("classed for HTML component", (t) => {
  const component = (classed as any).div`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("classed for React component", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = (classed as any)(base)`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo bar"></div>')
})

test("classed for classed component", (t) => {
  const base = (classed as any).div`baz`
  const component = (classed as any)(base)`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="baz foo bar"></div>')
})

test("classed for classed component with multiple inheritances", (t) => {
  const base0 = (classed as any).div`foo0`
  const base1 = (classed as any)(base0)`foo1`
  const base = (classed as any)(base1)`foo2`
  const component = (classed as any)(base)`foo bar`
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 foo bar"></div>')
})

test("classed for HTML component with props", (t) => {
  const component = (classed as any).div((props: any) => `foo bar ${props.arg}`)
  const element = createElement(component, { arg: "baz" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar baz" arg="baz"></div>')
})

test("classed for HTML component with props, alt syntax", (t) => {
  const component = (classed as any).div`foo ${(props: any) => props.arg} baz`
  const element = createElement(component, { arg: "bar" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar baz" arg="bar"></div>')
})

test("classed for React component with props", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = (classed as any)(base)((props: any) => `foo ${props.arg}`)
  const element = createElement(component, { arg: "bar" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar" arg="bar"></div>')
})

test("classed for React component with props, alt syntax", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = (classed as any)(base)`foo ${(props: any) => props.arg} baz`
  const element = createElement(component, { arg: "bar" })
  const result = renderToString(element)
  t.is(result, '<div class="foo bar baz" arg="bar"></div>')
})

test("classed for classed component with props", (t) => {
  const base = (classed as any).div((props: any) => `foo ${props.base}`)
  const component = (classed as any)(base)((props: any) => `bar ${props.arg}`)
  const element = createElement(component, { base: "base", arg: "arg" })
  const result = renderToString(element)
  t.is(result, '<div class="foo base bar arg" base="base" arg="arg"></div>')
})

test("classed for classed component with props, alt syntax", (t) => {
  const base = (classed as any).div`foo ${(props: any) => props.base}`
  const component = (classed as any)(base)`bar ${(props: any) => props.arg}`
  const element = createElement(component, { base: "base", arg: "arg" })
  const result = renderToString(element)
  t.is(result, '<div class="foo base bar arg" base="base" arg="arg"></div>')
})

test(
  "classed for classed component with props, with multiple inheritances",
  (t) => {
  const base0 = (classed as any).div((props: any) => `${props.base0}`)
  const base1 = (classed as any)(base0)((props: any) => `${props.base1}`)
  const base = (classed as any)(base1)((props: any) => `${props.base2}`)
  const component = (classed as any)(base)((props: any) => `bar ${props.arg}`)
  const element = createElement(component, {
    base0: "foo0", base1: "foo1", base2: "foo2", arg: "arg"
  })
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 bar arg" base0="foo0" base1="foo1" base2="foo2" arg="arg"></div>')
})

test(
  "classed for classed component with props, with multiple inheritances, alt syntax",
  (t) => {
  const base0 = (classed as any).div`${(props: any) => props.base0}`
  const base1 = (classed as any)(base0)`${(props: any) => props.base1}`
  const base = (classed as any)(base1)`${(props: any) => props.base2}`
  const component = (classed as any)(base)`bar ${(props: any) => props.arg}`
  const element = createElement(component, {
    base0: "foo0", base1: "foo1", base2: "foo2", arg: "arg"
  })
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 bar arg" base0="foo0" base1="foo1" base2="foo2" arg="arg"></div>')
})

test("inherited for HTML component", (t) => {
  const component = (inherited as any).div({ key0: 'value0' })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div key0="value0"></div>')
})

test("inherited for React component", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = (inherited as any)(base)({ key0: 'value0' })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div key0="value0"></div>')
})

test("inherited for inherited component", (t) => {
  const base = (inherited as any).div({ key0: 'value0' })
  const component = (inherited as any)(base)({ key1: 'value1' })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div key0="value0" key1="value1"></div>')
})

test("inherited for inherited component with multiple inheritances", (t) => {
  const base0 = (inherited as any).div({ className: "foo0" })
  const base1 = (inherited as any)(base0)({ className: "foo1" })
  const base = (inherited as any)(base1)({ className: "foo2" })
  const component = (inherited as any)(base)({ className: "foo bar" })
  const element = createElement(component)
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 foo bar"></div>')
})

test("inherited for HTML component with props", (t) => {
  const component = (inherited as any).div(
    (props: any) => ({ key0: props.key0 }))
  const element = createElement(component, { key0: 'value0' })
  const result = renderToString(element)
  t.is(result, '<div key0="value0"></div>')
})

test("inherited for React component with props", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = (inherited as any)(base)(
    (props: any) => ({ key0: props.key0 }))
  const element = createElement(component, { key0: 'value0' })
  const result = renderToString(element)
  t.is(result, '<div key0="value0"></div>')
})

test("inherited for inherited component with props", (t) => {
  const base = (inherited as any).div(
    (props: any) => ({ key0: props.key0 }))
  const component = (inherited as any)(base)(
    (props: any) => ({ key1: props.key1 }))
  const element = createElement(component, { key0: 'value0', key1: 'value1' })
  const result = renderToString(element)
  t.is(result, '<div key0="value0" key1="value1"></div>')
})

test(
  "inherited for inherited component with props, with multiple inheritances",
  (t) => {
  const base0 = (inherited as any).div(
    (props: any) => ({ className: props.foo0 }))
  const base1 = (inherited as any)(base0)(
    (props: any) => ({ className: props.foo1 }))
  const base = (inherited as any)(base1)(
    (props: any) => ({ className: props.foo2 }))
  const component = (inherited as any)(base)(
    (props: any) => ({ className: props.arg }))
  const element = createElement(component, {
    foo0: "foo0", foo1: "foo1", foo2: "foo2", arg: "bar"
  })
  const result = renderToString(element)
  t.is(result, '<div class="foo0 foo1 foo2 bar" foo0="foo0" foo1="foo1" foo2="foo2" arg="bar"></div>')
})
