// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
]

// ============= Your Code Here =============
type Shift<T extends unknown[]> = T extends [unknown, ...infer A] ? A : T

type Without<
  T extends unknown[],
  U,
  R extends unknown[] = []
> = T['length'] extends 0
  ? R
  : U extends unknown[]
  ? Without<Shift<T>, U, T[0] extends U[number] ? R : [...R, T[0]]>
  : Without<Shift<T>, U, T[0] extends U ? R : [...R, T[0]]>
