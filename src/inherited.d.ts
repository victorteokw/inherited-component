import type { JSX, ReactNode } from "react"
import type { ComponentConfig } from './config'
import type { IntrinsicElementsResult } from './intrinsic'

type InheritedCreator<P, N = ReactNode> = {
  (extractor: (props: P) => Partial<P>): (props: P) => N
  <T>(extractor: (props: T & P) => Partial<P>, config?: ComponentConfig<T & P>): (props: T & P) => N
  (props: P): (props: P) => N
}

export type Inherited = {
  <P, N>(component: (props: P) => N): InheritedCreator<P, N>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: InheritedCreator<JSX.IntrinsicElements[N], IntrinsicElementsResult[N]>
}

/**
 * ## Inherited
 *
 * Create an inherited component.
 */
export const inherited: Inherited
