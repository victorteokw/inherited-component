import { TuplifyUnion } from './tuple'

export type ComponentConfig<P> = {
  unforwardableProps: TuplifyUnion<keyof P>
}
