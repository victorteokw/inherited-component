import "global-jsdom/register"
import test from 'ava'
import { createElement, DetailedHTMLProps, HTMLAttributes } from 'react'
import { render } from '@testing-library/react'
import { classed, inherited } from '..'

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

test("classed for HTML component", (t) => {
  const component = classed.div`foo bar`
  const element = component({})
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("class"), "foo bar")
})

test("classed for React component", (t) => {
  const base = (props: DivProps) => createElement('div', props)
  const component = classed(base)`foo bar`
  const element = component({})
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("class"), "foo bar")
})

test("classed for classed component", (t) => {
  const base = classed.div`baz`
  const component = classed(base)`foo bar`
  const element = component({})
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("class"), "baz foo bar")
})

test("classed for classed component with multiple inheritances", (t) => {
  const base0 = classed.div`foo0`
  const base1 = classed(base0)`foo1`
  const base = classed(base1)`foo2`
  const component = classed(base)`foo bar`
  const element = component({})
  const container = render(element).container
  t.is(
    container.querySelector("div")?.getAttribute("class"),
    "foo0 foo1 foo2 foo bar")
})

test("classed for HTML component with intrinsic props", (t) => {
  const component = classed.div`foo bar ${props => `${props.id}`}`
  const element = component({ id: "baz" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar baz")
  t.is(div.getAttribute("id"), "baz")
})

test("classed for HTML component with props", (t) => {
  const component = classed.div<{ arg: string }>(
    (props) => `foo bar ${props.arg}`,
    { unforwardableProps: ['arg'] })
  const element = component({ arg: "baz" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar baz")
})

test("classed for React component with props", (t) => {
  const base = (props: DivProps) => createElement('div', props)
  const component = classed(base)<{ arg: string }>(
    (props) => `foo ${props.arg}`,
    { unforwardableProps: ['arg'] })
  const element = component({ arg: "bar" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar")
})

test("classed for classed component with props", (t) => {
  const base = classed.div<{ base: string }>(
    (props) => `foo ${props.base}`,
    { unforwardableProps: ['base'] })
  const component = classed(base)<{ arg: string }>(
    (props) => `bar ${props.arg}`,
    { unforwardableProps: ['arg'] })
  const element = component({ base: "base", arg: "arg" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo base bar arg")
})

test(
  "classed for classed component with props, with multiple inheritances",
  (t) => {
  const base0 = classed.div<{ base0: string }>(
    (props) => `${props.base0}`,
    { unforwardableProps: ['base0'] })
  const base1 = classed(base0)<{ base1: string }>(
    (props) => `${props.base1}`,
    { unforwardableProps: ['base1'] })
  const base = classed(base1)<{ base2: string }>(
    (props) => `${props.base2}`,
    { unforwardableProps: ['base2'] })
  const component = classed(base)<{ arg: string }>(
    (props) => `bar ${props.arg}`,
    { unforwardableProps: ['arg'] })
  const element = component({
    base0: "foo0", base1: "foo1", base2: "foo2", arg: "arg"
  })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo0 foo1 foo2 bar arg")
})

test("inherited for HTML component", (t) => {
  const component = inherited.div({ id: 'value0' })
  const element = component({})
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("id"), "value0")
})

test("inherited for React component", (t) => {
  const base = (props: DivProps) => createElement('div', props)
  const component = inherited(base)({ id: 'value0' })
  const element = component({})
  const container = render(element).container
  t.is(container.querySelector("div")?.getAttribute("id"), "value0")
})

test("inherited for inherited component", (t) => {
  const base = inherited.div({ id: 'value0' })
  const component = inherited(base)({ className: 'value1' })
  const element = component({})
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
  t.is(div.getAttribute("class"), "value1")
})

test("inherited for inherited component with multiple inheritances", (t) => {
  const base0 = inherited.div({ className: "foo0" })
  const base1 = inherited(base0)({ className: "foo1" })
  const base = inherited(base1)({ className: "foo2" })
  const component = inherited(base)({ className: "foo bar" })
  const element = component({})
  const container = render(element).container
  t.is(
    container.querySelector("div")?.getAttribute("class"),
    "foo0 foo1 foo2 foo bar")
})

test("inherited for HTML component with props", (t) => {
  const component = inherited.div<{ key0: string }>(
    (props) => ({ id: props.key0 }),
    { unforwardableProps: ['key0'] })
  const element = component({ key0: 'value0' })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
})

test("inherited for React component with props", (t) => {
  const base = (props: DivProps) => createElement('div', props)
  const component = inherited(base)<{key0: string}>(
    (props) => ({ id: props.key0 }),
    { unforwardableProps: ['key0'] })
  const element = component({ key0: 'value0' })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
})

test("inherited for inherited component with props", (t) => {
  const base = inherited.div<{ key0: string }>(
    (props) => ({ id: props.key0 }),
    { unforwardableProps: ['key0']})
  const component = inherited(base)<{ key1: string }>(
    (props) => ({ className: props.key1 }),
    { unforwardableProps: ['key1'] })
  const element = component({ key0: 'value0', key1: 'value1' })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("id"), "value0")
  t.is(div.getAttribute("class"), "value1")
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
  const element = component({
    foo0: "foo0", foo1: "foo1", foo2: "foo2", arg: "bar"
  })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo0 foo1 foo2 bar")
})

test("classed with unforwardable props", (t) => {
  const component = classed.div<{ foo0: string }>(
    (props) => `${props.foo0}`,
    { unforwardableProps: ['foo0'] })
  const element = component({ "foo0": "flex" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "flex")
  t.is(div.getAttribute("foo0"), null)
})

test("inherited with unforwardable props", (t) => {
  const component = inherited.div<{ foo0: string }>(
    (props) => ({ className: props.foo0 }),
    { unforwardableProps: ['foo0'] })
  const element = component({ "foo0": "flex" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "flex")
  t.is(div.getAttribute("foo0"), null)
})

test("inherited sets default props with object syntax", (t) => {
  const base = (props: { must: number, have: boolean }) => createElement(
    'div',
    { className: `${props.must} ${props.have}` })
  const component = inherited(base)({ must: 1 })
  const element = component({ have: true })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "1 true")
})

test("inherited sets default props with function syntax", (t) => {
  const base = (props: { must: number, have: boolean }) => createElement(
    'div',
    { className: `${props.must} ${props.have}` })
  const component = inherited(base)(() => ({ must: 1 }))
  const element = component({ have: true })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "1 true")
})

test("inherited sets default props with additional props", (t) => {
  const base = (props: { must: number, have: boolean }) => createElement(
    'div',
    { className: `${props.must} ${props.have}` })
  const component = inherited(base)<{ foo: string }, { must: number }>(
    () => ({ must: 1 }),
    { unforwardableProps: [ 'foo' ]})
  const element = component({ have: true, foo: "value" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "1 true")
})


test("classed sets default class name with string syntax", (t) => {
  const base = (props: { className: string }) => createElement('div', props)
  const component = classed(base)`foo bar`
  const element = component({})
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar")
})

test("classed sets default class name with function syntax", (t) => {
  const base = (props: { className: string }) => createElement('div', props)
  const component = classed(base)(() => 'foo bar')
  const element = component({})
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar")
})

test("classed sets default class name with additional props", (t) => {
  const base = (props: { className: string }) => createElement('div', props)
  const component = classed(base)<{ foo: string }>(() => 'foo bar', {
    unforwardableProps: [ 'foo' ]
  })
  const element = component({ foo: "value" })
  const container = render(element).container
  const div = container.querySelector("div")!
  t.is(div.getAttribute("class"), "foo bar")
})
