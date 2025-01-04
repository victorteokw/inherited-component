import { ReactNode } from 'react'
import type { AcceptClassName } from './classed'
import type { ComponentConfig } from './config'
import type {
  ComponentTransformer,
  ComponentTransformerWithAdditionalProps
} from './transformer'

type WithClasses = {
  <P>(extractor: (props: P) => string): ComponentTransformer<P>
  <T, P>(extractor: (props: T & P) => string, config: ComponentConfig<T>): ComponentTransformerWithAdditionalProps<T, P>
  (strings: TemplateStringsArray): ComponentTransformer<AcceptClassName>
  <P>(strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): ComponentTransformer<P>
}

export const withClasses: WithClasses
