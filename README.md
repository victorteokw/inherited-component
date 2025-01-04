Inherited Component
===================

Classed component with custom props and attributes.

## Installation

Install `inherited-component` simply with this command. No transpiling plugins
required.

```sh
npm i inherited-component
```

## Usage

### Define a primitive classed component

```ts
import { classed } from 'inherited-component'

const Container = classed.div`container max-sm:px-4 mx-auto`
```

### Inherit a component with additional classes

> Note: The wrapped component should accept `className` property.

```ts
import { classed } from 'inherited-component'

const FlexContainer = classed(Container)`flex flex-col`
```

### Define a primitive classed component with classes custom props

```ts
import { classed } from 'inherited-component'

const Button = classed.button<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => `${variant === 'm' ? 'text-xl' : 'text-2xl'}`,
  { unforwardableProps: ['variant'] })
```

### Inherit a component with classes from custom props

```ts
import { classed } from 'inherited-component'

const Button = classed(BaseButton)<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => `${variant === 'm' ? 'text-xl' : 'text-2xl'}`,
  { unforwardableProps: ['variant'] })
```

### Define a primitive component with custom attributes

```ts
import { inherited } from 'inherited-component'

const Input = inherited.input({
  className: "outline-none border-1 border-black border-solid",
  disabled: true
})
```

### Inherit a component with custom attributes

```ts
import { inherited } from 'inherited-component'

const Input = inherited(BaseInput)({
  className: "outline-none border-1 border-black border-solid",
  disabled: true
})
```

### Define a primitive inherited component with attributes from custom props

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

```ts
import { inherited } from 'inherited-component'

const Button = inherited(Button)<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => ({
    className: `${props.variant === 'm' ? 'text-xl' : 'text-2xl'}`,
    disabled: true
  }),
  { unforwardableProps: ['variant'] })
```

## Props Passing

Just like styled-component, props are passed down by default. To prevent
unexpected props being passed down, we enforce you to declare unforwardable
props.

### Unforwardable Props

Pass a list of prop names which shouldn't be passed down.

```ts
import { inherited } from 'inherited-component'

const Button = inherited(Button)<{ variant: "m" | "l" }>(
  ({ variant = "m" }) => ({
    className: `${props.variant === 'm' ? 'text-xl' : 'text-2xl'}`,
    disabled: true
  }),
  { unforwardable: ['variant'] })
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
