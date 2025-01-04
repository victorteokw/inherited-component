Inherited Component
===================
[![NPM version][npm-image]][npm-url]
[![Build Status][github-ci-image]][github-ci-url]
[![Test Coverage][cov-image]][cov-url]
[![License][license-image]][license-url]
[![PR Welcome][pr-image]][pr-url]

A set of utility functions that takes component reusing to a higher level.
Inherited Component is the styled-component of the tailwind age.

## Features

* ✅ Classed component that works great with tailwind
* ✅ Classed component with additional props
* ✅ Inherited component with default prop values
* ✅ Inherited component with additional props
* ✅ Component inheritance
* ✅ Supports hooks inside the function body
* ✅ Component transformers that works great with headless components
* ✅ Type-strict, a higher level of type-safe

## Installation

Install `inherited-component` simply with this command. No transpiling plugins
required.

```sh
npm i inherited-component
```

## Usage

### Define a intrinsic classed component

Define a component which behaves just like the intrinsic component with
predefined classes in one line.

```ts
import { classed } from 'inherited-component'

const Container = classed.div`container max-sm:px-4 mx-auto`
```

### Inherit a component with additional classes

Take a component which may or may not have class names, create a new component
by appending more classes on it. The other props and hooks are preserved. The
newly created component takes any parameter that the previous component
accepts.

> Note: The wrapped component should accept `className` property.

```ts
import { classed } from 'inherited-component'

const FlexContainer = classed(Container)`flex flex-col`
```

### Define a intrinsic classed component with custom props

Define a classed component with dynamic classes calculated from additional
props. The type checker helps you to remove the additional properties in case
of passing it to the underlying component.

```ts
import { classed } from 'inherited-component'

const Button = classed.button<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => `${variant === 'm' ? 'text-xl' : 'text-2xl'}`,
  { unforwardableProps: ['variant'] })
```

### Inherit a component with classes from custom props

This works with custom components in the same way, too. Just wrap the original
component in a pair of parens.

```ts
import { classed } from 'inherited-component'

const Button = classed(BaseButton)<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => `${variant === 'm' ? 'text-xl' : 'text-2xl'}`,
  { unforwardableProps: ['variant'] })
```

### Define a intrinsic component with custom attributes

With `inherited`, any properties can be merged and passed down. Use dot syntax
for intrinsic components.

```ts
import { inherited } from 'inherited-component'

const Input = inherited.input({
  className: "outline-none border-1 border-black border-solid",
  disabled: true
})
```

### Inherit a component with custom attributes

Inherited component can inherit any component, not only intrinsic ones.

```ts
import { inherited } from 'inherited-component'

const Input = inherited(BaseInput)({
  className: "outline-none border-1 border-black border-solid",
  disabled: true
})
```

### Define a intrinsic inherited component with attributes from custom props

Like its counterpart `classed`, `inherited` works with additional props. Don't
forget to prevent the undesired props from passing down.

```ts
import { inherited } from 'inherited-component'

const Button = inherited.button<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => ({
    className: `${props.variant === 'm' ? 'text-xl' : 'text-2xl'}`,
    disabled: true
  }),
  { unforwardableProps: ['variant'] })
```

### Inherit a component with attributes from custom props

The same works for any component. You can even put hooks inside the function
body.

```ts
import { inherited } from 'inherited-component'

const Button = inherited(Button)<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => ({
    className: `${props.variant === 'm' ? 'text-xl' : 'text-2xl'}`,
    disabled: true
  }),
  { unforwardableProps: ['variant'] })
```

### Define a reusable transformer with predefined classes

In some cases, we want different components to look the same. For example, we
may want `a`, `button` and some headless components to look and feel the same
in a header. Then simply do this. The `withClasses` takes the same parameters
as the `classed` function.

```ts
import { withClasses } from 'inherited-component'

const intoHeaderButton = withClasses`
  hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl p-2 cursor-pointer
`

const HeaderButton = intoHeaderButton.button
const HeaderLink = intoHeaderButton(Link)
const HeaderDropdownTrigger = intoHeaderButton(DropdownTrigger)
```

### Define a reusable transformer with predefined properties

`withProps` is a more generic alternative to the `withClasses` counterpart. It
allows class name and other properties to be set. It takes the same parameters
as `inherited`.

```ts
import { withProps } from 'inherited-component'

const intoDefaultDisabled = withProps({ disable: true })

const DefaultDisabledButton = intoDefaultDisabled.button
const DefaultDisabledInput = intoDefaultDisabled.input
const DefaultDisabledSwitch = intoDefaultDisabled(Switch)
```

## Props Passing

Just like styled-component, props are merged and passed down by default. To
prevent unexpected props being passed down, we enforce you to declare
unforwardable props.

### Unforwardable Props

Pass a list of prop names which shouldn't be passed down.

```ts
import { inherited } from 'inherited-component'

const Button = inherited(Button)<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => ({
    className: `${props.variant === 'm' ? 'text-xl' : 'text-2xl'}`,
    disabled: true
  }),
  { unforwardableProps: ['variant'] })
```

## Editor Config

By adding this script to your `settings.json` in the workspace or globally, you
can set the regex for the classed method to match the class names and provide
intellisense.

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["classed(?:\\.\\w*)?\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## License

This package is an open-sourced software licensed under the
[MIT License][license-url].

## Contributing

Issues and PRs are obviously welcomed and encouraged, for bug fixing, more
accurate type definitions, new features as well as documentation.

[npm-image]: https://img.shields.io/npm/v/inherited-component.svg?style=flat-square&color=ff69b4&logo=react
[npm-url]: https://npmjs.org/package/inherited-component
[github-ci-image]: https://img.shields.io/github/actions/workflow/status/victorteokw/inherited-component/CI.yml.svg?style=flat-square&color=green&logo=github
[github-ci-url]: https://github.com/victorteokw/inherited-component/actions/
[cov-image]: https://img.shields.io/codecov/c/github/victorteokw/inherited-component/main.svg?style=flat-square&logo=codecov
[cov-url]: https://codecov.io/gh/victorteokw/inherited-component
[license-image]: https://img.shields.io/github/license/victorteokw/inherited-component.svg?style=flat-square&color=blue
[license-url]: https://github.com/victorteokw/inherited-component/blob/master/LICENSE
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&color=orange
[pr-url]: https://github.com/victorteokw/inherited-component/blob/master/CONTRIBUTING.md
