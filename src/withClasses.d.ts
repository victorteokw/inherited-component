import { ReactNode } from 'react'
import type { ComponentConfig } from './config'

type WithClasses<P> = {
  (extractor: (props: P) => string): (component: (props: P) => ReactNode) => (props: P) => ReactNode
  <T>(extractor: (props: T & P) => string, config?: ComponentConfig<T & P>): (component: (props: P) => ReactNode) => (props: T & P) => ReactNode
  (strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): (component: (props: P) => ReactNode) => (props: P) => ReactNode
  <T>(strings: TemplateStringsArray, ...interpolations: ((props: T & P) => string)[]): (component: (props: P) => ReactNode) => (props: T & P) => ReactNode
}

export const withClasses: WithClasses
