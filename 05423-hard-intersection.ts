// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>
]

// ============= Your Code Here =============
type ToUnion<T extends (unknown | unknown[])[]> = T extends [
  infer A,
  ...infer B
]
  ? [A] extends [unknown[]]
    ? ((arg: [A[number]]) => any) | ToUnion<B>
    : ((arg: [A]) => any) | ToUnion<B>
  : never

type Intersection<T extends (unknown | unknown[])[]> = ToUnion<T> extends (
  arg: [infer P]
) => any
  ? P
  : never
