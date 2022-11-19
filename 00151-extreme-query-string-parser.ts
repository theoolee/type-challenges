// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<
    Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>
  >,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<
    Equal<
      ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>,
      { k1: ['v1', 'v2', 'v3']; k2: 'v2' }
    >
  >
]

// ============= Your Code Here =============
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? K extends keyof T
      ? U[K] extends unknown[]
        ? [T[K], ...U[K]]
        : T[K] extends U[K]
        ? T[K]
        : [T[K], U[K]]
      : U[K]
    : K extends keyof T
    ? T[K]
    : never
}

type ParsePair<T extends string> = T extends `${infer K}=${infer V}`
  ? {
      [P in K]: V
    }
  : {
      [P in T]: true
    }

type ParseQueryString<T extends string> = T extends ''
  ? {}
  : T extends `${infer P}&${infer R}`
  ? Merge<ParsePair<P>, ParseQueryString<R>>
  : ParsePair<T>
