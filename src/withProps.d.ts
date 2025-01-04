import { ReactNode } from 'react'
import type { ComponentConfig } from './config'
import type {
  ComponentTransformer,
  ComponentTransformerWithAdditionalProps
} from './transformer'

type WithProps = {
  <P>(props: P): ComponentTransformer<P>
  <P, D extends NoInfer<Partial<P>>>(extractor: (props: P) => D): ComponentTransformer<PartialBy<P, keyof D>>
  <T, P, D extends NoInfer<Partial<P>>>(extractor: (props: T & P) => D, config: ComponentConfig<T>): ComponentTransformerWithAdditionalProps<T, PartialBy<T & P, keyof D>>
}

export const withProps: WithProps
