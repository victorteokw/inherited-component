import "global-jsdom/register"
import { classed, inherited } from '..'
import { createElement, HTMLProps } from 'react'
import { render } from '@testing-library/react'
import test from 'ava'

test("classed for HTML component", (t) => {
  const component = classed.div`foo bar`
  const element = createElement(component)
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("class"), "foo bar")
})

test("classed for React component", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = classed(base)`foo bar`
  const element = createElement(component)
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("class"), "foo bar")
})

test("classed for classed component", (t) => {
  const base = classed.div`baz`
  const component = classed(base)`foo bar`
  const element = createElement(component)
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("class"), "baz foo bar")
})

test("classed for classed component with multiple inheritances", (t) => {
  const base0 = classed.div`foo0`
  const base1 = classed(base0)`foo1`
  const base = classed(base1)`foo2`
  const component = classed(base)`foo bar`
  const element = createElement(component)
  const container = render(element).container
  t.is(
    container.querySelector("div")?.getAttribute("class"),
    "foo0 foo1 foo2 foo bar")
})

test("classed for HTML component with props", (t) => {
  const component = classed.div<{ arg: string }>((props) => `foo bar ${props.arg}`)
  const element = createElement(component, { arg: "baz" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar baz")
  t.is(div.getAttribute("arg"), "baz")
})

test("classed for HTML component with props, alt syntax", (t) => {
  const component = classed.div<{ arg: string }>`foo ${(props) => props.arg} baz`
  const element = createElement(component, { arg: "bar" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar baz")
  t.is(div.getAttribute("arg"), "bar")
})

test("classed for React component with props", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = classed(base)<{ arg: string }>((props) => `foo ${props.arg}`)
  const element = createElement(component, { arg: "bar" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar")
  t.is(div.getAttribute("arg"), "bar")
})

test("classed for React component with props, alt syntax", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = classed(base)<{ arg: string }>`foo ${(props) => props.arg} baz`
  const element = createElement(component, { arg: "bar" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar baz")
  t.is(div.getAttribute("arg"), "bar")
})

test("classed for classed component with props", (t) => {
  const base = classed.div<{ base: string }>((props) => `foo ${props.base}`)
  const component = classed(base)<{ arg: string }>((props) => `bar ${props.arg}`)
  const element = createElement(component, { base: "base", arg: "arg" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo base bar arg")
  t.is(div.getAttribute("base"), "base")
  t.is(div.getAttribute("arg"), "arg")
})

test("classed for classed component with props, alt syntax", (t) => {
  const base = classed.div<{ base: string }>`foo ${(props) => props.base}`
  const component = classed(base)<{ arg: string }>`bar ${(props) => props.arg}`
  const element = createElement(component, { base: "base", arg: "arg" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo base bar arg")
  t.is(div.getAttribute("base"), "base")
  t.is(div.getAttribute("arg"), "arg")
})

test(
  "classed for classed component with props, with multiple inheritances",
  (t) => {
  const base0 = classed.div<{ base0: string }>((props) => `${props.base0}`)
  const base1 = classed(base0)<{ base1: string }>((props) => `${props.base1}`)
  const base = classed(base1)<{ base2: string }>((props) => `${props.base2}`)
  const component = classed(base)<{ arg: string }>((props) => `bar ${props.arg}`)
  const element = createElement(component, {
    base0: "foo0", base1: "foo1", base2: "foo2", arg: "arg"
  })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo0 foo1 foo2 bar arg")
  t.is(div.getAttribute("base0"), "foo0")
  t.is(div.getAttribute("base1"), "foo1")
  t.is(div.getAttribute("base2"), "foo2")
  t.is(div.getAttribute("arg"), "arg")
})

test(
  "classed for classed component with props, with multiple inheritances, alt syntax",
  (t) => {
  const base0 = classed.div<{ base0: string }>`${(props) => props.base0}`
  const base1 = classed(base0)<{ base1: string }>`${(props) => props.base1}`
  const base = classed(base1)<{ base2: string }>`${(props) => props.base2}`
  const component = classed(base)<{ arg: string }>`bar ${(props) => props.arg}`
  const element = createElement(component, {
    base0: "foo0", base1: "foo1", base2: "foo2", arg: "arg"
  })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo0 foo1 foo2 bar arg")
  t.is(div.getAttribute("base0"), "foo0")
  t.is(div.getAttribute("base1"), "foo1")
  t.is(div.getAttribute("base2"), "foo2")
  t.is(div.getAttribute("arg"), "arg")
})

test("inherited for HTML component", (t) => {
  const component = inherited.div({ id: 'value0' })
  const element = createElement(component)
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("id"), "value0")
})

test("inherited for React component", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = inherited(base)({ id: 'value0' })
  const element = createElement(component)
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("id"), "value0")
})

test("inherited for inherited component", (t) => {
  const base = inherited.div({ id: 'value0' })
  const component = inherited(base)({ className: 'value1' })
  const element = createElement(component)
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
  t.is(div.getAttribute("className"), "value1")
})

test("inherited for inherited component with multiple inheritances", (t) => {
  const base0 = inherited.div({ className: "foo0" })
  const base1 = inherited(base0)({ className: "foo1" })
  const base = inherited(base1)({ className: "foo2" })
  const component = inherited(base)({ className: "foo bar" })
  const element = createElement(component)
  const container = render(element).container
  t.is(
    container.querySelector("div")?.getAttribute("class"),
    "foo0 foo1 foo2 foo bar")
})

test("inherited for HTML component with props", (t) => {
  const component = inherited.div<{ key0: string }>(
    (props) => ({ id: props.key0 }))
  const element = createElement(component, { key0: 'value0' })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
  t.is(div.getAttribute("key0"), "value0")
})

test("inherited for React component with props", (t) => {
  const base = (props: HTMLProps<HTMLDivElement>) => createElement('div', props)
  const component = inherited(base)<{key0: string}>(
    (props) => ({ id: props.key0 }))
  const element = createElement(component, { key0: 'value0' })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
  t.is(div.getAttribute("key0"), "value0")
})

test("inherited for inherited component with props", (t) => {
  const base = inherited.div<{ key0: string }>(
    (props) => ({ id: props.key0 }))
  const component = inherited(base)<{ key1: string }>(
    (props) => ({ className: props.key1 }))
  const element = createElement(component, { key0: 'value0', key1: 'value1' })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
  t.is(div.getAttribute("class"), "value1")
  t.is(div.getAttribute("key0"), "value0")
  t.is(div.getAttribute("key1"), "value1")
})

test(
  "inherited for inherited component with props, with multiple inheritances",
  (t) => {
  const base0 = inherited.div<{ foo0: string }>(
    (props) => ({ className: props.foo0 }))
  const base1 = inherited(base0)<{ foo1: string }>(
    (props) => ({ className: props.foo1 }))
  const base = inherited(base1)<{ foo2: string }>(
    (props) => ({ className: props.foo2 }))
  const component = inherited(base)<{ arg: string }>(
    (props) => ({ className: props.arg }))
  const element = createElement(component, {
    foo0: "foo0", foo1: "foo1", foo2: "foo2", arg: "bar"
  })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo0 foo1 foo2 bar")
  t.is(div.getAttribute("foo0"), "foo0")
  t.is(div.getAttribute("foo1"), "foo1")
  t.is(div.getAttribute("foo2"), "foo2")
  t.is(div.getAttribute("arg"), "bar")
})

test("classed with transient props", (t) => {

})

test("inherited with transient props", (t) => {

})
