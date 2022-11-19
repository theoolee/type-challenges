// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>
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
