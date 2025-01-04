import { ComponentProps, ReactNode } from 'react'

const never = Symbol('never')
type Never<T extends string> = { [never]: T }

export type ComponentTransformer<B> = {
  <P extends NoInfer<B>>(component: (props: P) => ReactNode): (props: P) => ReactNode
  <C extends string, CP extends ComponentProps<C>, P extends B & CP>(component: C): (props: P) => ReactNode
}

export type ComponentTransformerWithAdditionalProps<T, B> = {
  <P extends NoInfer<B>>(component: (props: P) => ReactNode): (props: T & P) => ReactNode
  <C extends string, CP extends ComponentProps<C>, P extends B & CP>(component: C): (props: T & P) => ReactNode
}
