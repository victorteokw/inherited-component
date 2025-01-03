import { ReactNode } from 'react'
import type { ComponentConfig } from './config'
import type {
  ComponentTransformer,
  ComponentTransformerWithAdditionalProps
} from './transformer'

type WithClasses = {
  <P>(extractor: (props: P) => string): ComponentTransformer<P>
  <T, P>(extractor: (props: T & P) => string, config?: ComponentConfig<T & P>): ComponentTransformerWithAdditionalProps<T, P>
  <P>(strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): ComponentTransformer<P>
  <T, P>(strings: TemplateStringsArray, ...interpolations: ((props: T & P) => string)[]): ComponentTransformerWithAdditionalProps<T, P>
}

export const withClasses: WithClasses
