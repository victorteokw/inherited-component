import type { DetailedReactHTMLElement, JSX, ReactNode, ReactComponentElement } from "react"
import type { ComponentConfig } from './config'
import type { IntrinsicElementsResult } from './intrinsic'

type ClassedCreator<P, N = ReactNode> = {
  (extractor: (props: P) => string): (props: P) => N
  <T>(extractor: (props: T & P) => string, config?: ComponentConfig<T & P>): (props: T & P) => N
  (strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): (props: P) => N
  <T>(strings: TemplateStringsArray, ...interpolations: ((props: T & P) => string)[]): (props: T & P) => N
}

export type Classed = {
  <P, N>(component: (props: P) => N): ClassedCreator<P, N>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: ClassedCreator<JSX.IntrinsicElements[N], IntrinsicElementsResult[N]>
}

/**
 * ## Classed
 *
 * Create a classed component.
 */
export const classed: Classed
