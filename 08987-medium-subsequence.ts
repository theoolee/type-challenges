// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
]

// ============= Your Code Here =============
type Shift<T extends unknown[]> = T extends [unknown, ...infer A] ? A : T

type Subsequence<T extends unknown[]> = T['length'] extends 0
  ? T
  : [...([T[0]] | []), ...Subsequence<Shift<T>>]
