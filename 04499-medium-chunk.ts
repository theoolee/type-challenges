// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
]

// ============= Your Code Here =============
type Shift<T extends unknown[]> = T extends [unknown, ...infer A] ? A : T

type Chunk<
  T extends unknown[],
  S extends number,
  C extends unknown[] = [],
  R extends unknown[] = []
> = T['length'] extends 0
  ? C['length'] extends 0
    ? R
    : [...R, C]
  : C['length'] extends S
  ? Chunk<T, S, [], [...R, C]>
  : Chunk<Shift<T>, S, [...C, T[0]], R>
