// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
]

// ============= Your Code Here =============
type FlattenDepth<
  T extends unknown[],
  D extends number = 1,
  U extends unknown[] = []
> = U['length'] extends D
  ? T
  : T extends [infer A, ...infer B]
  ? A extends unknown[]
    ? [...FlattenDepth<A, D, [unknown, ...U]>, ...FlattenDepth<B, D, U>]
    : [A, ...FlattenDepth<B, D, U>]
  : T
