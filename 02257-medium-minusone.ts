// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>
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

type Pop<T extends unknown[]> = T extends [...infer A, unknown] ? A : T

type MinusOne<T extends number> = T extends 0
  ? -1
  : // @ts-ignore
    Pop<ToNumber<T>>['length']
