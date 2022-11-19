// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>
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

type Sum<T1 extends unknown, T2 extends unknown> = T1 extends number
  ? T2 extends number
    ? [...ToNumber<T1>, ...ToNumber<T2>]['length']
    : never
  : never

type TwoSum<T extends unknown[], U extends unknown> = T extends [
  infer A,
  ...infer B
]
  ? U extends Sum<A, B[number]>
    ? true
    : TwoSum<B, U>
  : false
