import { ReactNode } from 'react'

export type ComponentTransformer<B> = {
  <P extends NoInfer<B>, N extends NoInfer<ReactNode>>(component: (props: P) => N): (props: P) => N
//  <C extends string, CP extends ComponentProps<C>, P extends B & CP>(component: C): (props: P) => N
}

export type ComponentTransformerWithAdditionalProps<T, B> = {
  <P extends NoInfer<B>, N extends NoInfer<ReactNode>>(component: (props: P) => N): (props: T & P) => N
//  <C extends string, CP extends ComponentProps<C>, P extends B & CP>(component: C): (props: T & P) => N
}
