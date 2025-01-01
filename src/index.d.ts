import type { HTMLProps, JSX } from "react"

type ClassedCreator<P> = {
  (extractor: (props: P) => string): (props: P) => JSX.Element
  <T>(extractor: (props: T & P) => string): (props: T & P) => JSX.Element
  (strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): (props: P) => React.JSX.Element
  <T>(strings: TemplateStringsArray, ...interpolations: ((props: T & P) => string)[]): (props: T & P) => React.JSX.Element
}

export type Classed = {
  <P>(component: (props: P) => React.JSX.Element): ClassedCreator<P>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: ClassedCreator<JSX.IntrinsicElements[N]>
}

/**
 * ## Classed
 *
 * Create a classed component.
 */
export const classed: Classed

type InheritedCreator<P> = {
  (extractor: (props: P) => P): (props: P) => React.JSX.Element
  <T>(extractor: (props: T & P) => Partial<P>): (props: T & P) => React.JSX.Element
  (props: P): (props: P) => React.JSX.Element
}

export type Inherited = {
  <P>(component: (props: P) => React.JSX.Element): InheritedCreator<P>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: InheritedCreator<JSX.IntrinsicElements[N]>
}

/**
 * ## Inherited
 *
 * Create a inherited component.
 */
export const inherited: Inherited
