// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>
]

// ============= Your Code Here =============
type EndsWith<T extends string, U extends string> = T extends U
  ? true
  : T extends `${string}${infer S}`
  ? EndsWith<S, U>
  : false
