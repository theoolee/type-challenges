// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<
    Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>
  >
]

// ============= Your Code Here =============
type TenTimesNumber<T extends unknown[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T
]

type NumberWithinTen<
  T extends string | number,
  R extends unknown[] = []
> = `${R['length']}` extends `${T}` ? R : NumberWithinTen<T, [unknown, ...R]>

type ToNumber<
  T extends string | number,
  R extends unknown[] = []
> = `${T}` extends `${infer A}${infer B}`
  ? ToNumber<B, [...TenTimesNumber<R>, ...NumberWithinTen<A>]>
  : R

type GreaterThan<
  A extends string | number,
  B extends string | number
> = ToNumber<A> extends [...ToNumber<B>, ...infer R]
  ? R['length'] extends 0
    ? false
    : true
  : false

type Bubble<T extends number[], N extends boolean = false> = T extends [
  infer A,
  infer B,
  ...infer C
]
  ? A extends number
    ? B extends number
      ? GreaterThan<A, B> extends (N extends true ? false : true)
        ? [A, ...C] extends number[]
          ? [B, ...Bubble<[A, ...C], N>]
          : never
        : [B, ...C] extends number[]
        ? [A, ...Bubble<[B, ...C], N>]
        : never
      : never
    : never
  : T

type Sort<T extends number[], N extends boolean = false> = Bubble<
  T,
  N
> extends [...infer A, infer B]
  ? A extends number[]
    ? [...Sort<A, N>, B]
    : never
  : []
