import type { JSX, ReactNode } from "react"

type ComponentConfig<P> = {
  unforwardableProps: (keyof P)[]
}

type ClassedCreator<P> = {
  (extractor: (props: P) => string): (props: P) => ReactNode
  <T>(extractor: (props: T & P) => string, config?: ComponentConfig<T & P>): (props: T & P) => ReactNode
  (strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): (props: P) => ReactNode
  <T>(strings: TemplateStringsArray, ...interpolations: ((props: T & P) => string)[]): (props: T & P) => ReactNode
}

export type Classed = {
  <P>(component: (props: P) => ReactNode): ClassedCreator<P>
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
  (extractor: (props: P) => P): (props: P) => ReactNode
  <T>(extractor: (props: T & P) => Partial<P>, config?: ComponentConfig<T & P>): (props: T & P) => ReactNode
  (props: P): (props: P) => ReactNode
}

export type Inherited = {
  <P>(component: (props: P) => ReactNode): InheritedCreator<P>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: InheritedCreator<JSX.IntrinsicElements[N]>
}

/**
 * ## Inherited
 *
 * Create an inherited component.
 */
export const inherited: Inherited
