import { ComponentProps, ReactNode } from 'react'

export type ComponentTransformer<P> = {
  (component: (props: P) => ReactNode): (props: P) => ReactNode
  <C>(component: C): <C extends string, P extends ComponentProps<C>>(props: P) => ReactNode
}

export type ComponentTransformerWithAdditionalProps<T, P> = {
  (component: (props: P) => ReactNode): (props: T & P) => ReactNode
  <C>(component: C): <C extends string, P extends ComponentProps<C>>(props: P) => ReactNode
}
