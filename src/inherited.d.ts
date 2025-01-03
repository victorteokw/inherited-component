import type { JSX, ReactNode } from "react"
import type { ComponentConfig } from './config'

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
