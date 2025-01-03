import { ReactNode } from 'react'
import type { ComponentConfig } from './config'
import type {
  ComponentTransformer,
  ComponentTransformerWithAdditionalProps
} from './transformer'

type WithProps = {
  <P>(extractor: (props: P) => P): ComponentTransformer<P>
  <T, P>(extractor: (props: T & P) => Partial<P>, config?: ComponentConfig<T & P>): ComponentTransformerWithAdditionalProps<T, P>
  <P>(props: P): ComponentTransformer<P>
}

export const withProps: WithProps
