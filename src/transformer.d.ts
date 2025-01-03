import { ComponentProps, ReactNode } from 'react'

export type ComponentTransformer<B> = {
  <P extends B>(component: (props: P) => ReactNode): (props: P) => ReactNode
  <C extends string, P extends ComponentProps<C>>(component: C): (props: P) => ReactNode
}

export type ComponentTransformerWithAdditionalProps<T, B> = {
  <P extends B>(component: (props: P) => ReactNode): (props: T & P) => ReactNode
  <C extends string, P extends ComponentProps<C>>(component: C): (props: T & P) => ReactNode
}
