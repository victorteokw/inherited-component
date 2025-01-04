import type { DetailedReactHTMLElement, JSX, ReactNode, ReactComponentElement } from "react"
import type { ComponentConfig } from './config'
import type { IntrinsicElements } from './intrinsic'

export type ClassNameDefined = {
  className: string
}

export type AcceptClassName = {
  className?: string
}

type ClassedCreator<P, N = ReactNode> = {
  (extractor: (props: P) => string): (props: P) => N
  <T>(extractor: (props: T & P) => string, config: ComponentConfig<T>): (props: T & P) => N
  (strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): (props: P) => N
}

export type Classed = {
  <P, N>(component: (props: P) => N): ClassedCreator<P, N>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: ClassedCreator<JSX.IntrinsicElements[N], IntrinsicElements[N]>
}

/**
 * ## Classed
 *
 * Create a classed component.
 */
export const classed: Classed
