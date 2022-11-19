// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
]

// ============= Your Code Here =============
type StringToCharArray<S extends string> = S extends `${infer A}${infer B}`
  ? [A, ...StringToCharArray<B>]
  : []

type LengthOfString<S extends string> = StringToCharArray<S>['length']
