import React, { HTMLProps } from "react"

type ClassedCreator<P> = {
  (extractor: (props: P) => string): (props: P) => React.JSX.Element
  <T>(extractor: (props: T & P) => string): (props: T & P) => React.JSX.Element
  (strings: TemplateStringsArray, ...interpolations: ((props: P) => string)[]): (props: P) => React.JSX.Element
  <T>(strings: TemplateStringsArray, ...interpolations: ((props: T & P) => string)[]): (props: T & P) => React.JSX.Element
}

export interface Classed {
  <P>(component: (props: P) => React.JSX.Element): ClassedCreator<P>
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

type InheritedCreator<P> = {
  (extractor: (props: P) => P): (props: P) => React.JSX.Element
  <T>(extractor: (props: T & P) => Partial<P>): (props: T & P) => React.JSX.Element
  (props: P): (props: P) => React.JSX.Element
}

export interface Inherited {
  <P>(component: (props: P) => React.JSX.Element): InheritedCreator<P>
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
