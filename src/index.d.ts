import React, { HTMLProps } from "react"

type ClassedCreator<Props> = {
  (extractor: (props: Props) => string): (props: Props) => React.JSX.Element
  (strings: TemplateStringsArray, ...interpolations: ((props: Props) => string)[]): (props: Props) => React.JSX.Element
}

export interface Classed {
  <NewProps, Props>(component: (props: Props) => React.JSX.Element): ClassedCreator<NewProps & Props>
  /**
   * ### div
   *
   * Create a div element.
   */
  div: ClassedCreator<HTMLProps<HTMLDivElement>>
  /**
   * ### span
   *
   * Create a span element.
   */
  span: ClassedCreator<HTMLProps<HTMLSpanElement>>
}

/**
 * ## Classed
 *
 * Create a classed component.
 */
export const classed: Classed

type InheritedCreator<Props> = {
  (extractor: (props: Props) => Props): (props: Props) => React.JSX.Element
  (props: Props): (props: Props) => React.JSX.Element
}

export interface Inherited {
  <NewProps, Props>(component: (props: Props) => React.JSX.Element): InheritedCreator<NewProps & Props>
  /**
   * ### div
   *
   * Create a div element.
   */
  div: InheritedCreator<HTMLProps<HTMLDivElement>>
  /**
   * ### span
   *
   * Create a span element.
   */
  span: InheritedCreator<HTMLProps<HTMLSpanElement>>
}

/**
 * ## Inherited
 *
 * Create a inherited component.
 */
export const inherited: Inherited
