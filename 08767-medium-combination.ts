// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<
      Combination<['foo', 'bar', 'baz']>,
      | 'foo'
      | 'bar'
      | 'baz'
      | 'foo bar'
      | 'foo bar baz'
      | 'foo baz'
      | 'foo baz bar'
      | 'bar foo'
      | 'bar foo baz'
      | 'bar baz'
      | 'bar baz foo'
      | 'baz foo'
      | 'baz foo bar'
      | 'baz bar'
      | 'baz bar foo'
    >
  >
]

// ============= Your Code Here =============
type Combination<
  S extends string[],
  R extends string = never,
  U1 extends string = S[number],
  U2 extends string = U1
> = [U1] extends [never]
  ? R
  : U1 extends U2
  ? R | Combination<S, [R] extends [never] ? U1 : `${R} ${U1}`, Exclude<U2, U1>>
  : never
