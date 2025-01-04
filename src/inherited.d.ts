import type { JSX } from "react"
import type { ComponentConfig } from './config'
import type { IntrinsicElements } from './intrinsic'
import type { PartialBy } from './utils'

type InheritedCreator<P, N> = {
  <D extends NoInfer<Partial<P>>>(props: D): (props: PartialBy<P, keyof D>) => N
  <D extends NoInfer<Partial<P>>>(extractor: (props: P) => D): (props: PartialBy<P, keyof D>) => N
  <T>(extractor: (props: T & P) => Partial<P>, config: ComponentConfig<T>): (props: T & P) => N
  <T, D extends NoInfer<Partial<P>>>(extractor: (props: T & P) => D, config: ComponentConfig<T>): (props: PartialBy<T & P, keyof D>) => N
}

export type Inherited = {
  <P, N>(component: (props: P) => N): InheritedCreator<P, N>
} & {
  readonly [N in keyof JSX.IntrinsicElements]: InheritedCreator<JSX.IntrinsicElements[N], IntrinsicElements[N]>
}

/**
 * ## Inherited
 *
 * Create an inherited component.
 */
export const inherited: Inherited
