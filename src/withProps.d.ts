import { ReactNode } from 'react'
import type { ComponentConfig } from './config'

type WithProps<P> = {
  (extractor: (props: P) => P): (component: (props: P) => ReactNode) => (props: P) => ReactNode
  <T>(extractor: (props: T & P) => Partial<P>, config?: ComponentConfig<T & P>): (component: (props: P) => ReactNode) => (props: T & P) => ReactNode
  (props: P): (component: (props: P) => ReactNode) => (props: P) => ReactNode
}

export const withProps: WithProps
