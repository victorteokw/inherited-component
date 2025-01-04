import type { JSX, ReactNode } from 'react'
import type { IntrinsicElements } from './intrinsic'

export type ComponentTransformer<B> = {
  <P extends NoInfer<B>, N extends NoInfer<ReactNode>>(component: (props: P) => N): (props: P) => N
} & {
  readonly [N in keyof JSX.IntrinsicElements]: (props: JSX.IntrinsicElements[N]) => IntrinsicElements[N]
}

export type ComponentTransformerWithAdditionalProps<T, B> = {
  <P extends NoInfer<B>, N extends NoInfer<ReactNode>>(component: (props: P) => N): (props: T & P) => N
} & {
  readonly [N in keyof JSX.IntrinsicElements]: (props: JSX.IntrinsicElements[N] & T) => IntrinsicElements[N]
}
