export type ComponentConfig<P> = {
  unforwardableProps: (keyof P)[]
}
