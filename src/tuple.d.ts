export type TuplifyUnion<U extends string> = {
  [S in U]: // for each variant in the union
    Exclude<U, S> extends never // remove it and..
      ? [S] // ..stop recursion if it was the last variant
      : [...TuplifyUnion<Exclude<U, S>>, S] // ..recur if not
}[U] // extract all values from the object
