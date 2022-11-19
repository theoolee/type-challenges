// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>
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

type NumberRange<
  L extends number,
  H extends number,
  R extends unknown[] = []
> = L extends H
  ? [...R, L][number]
  : R['length'] extends L
  ? [...R, unknown]['length'] extends number
    ? NumberRange<[...R, unknown]['length'], H, [...R, R['length']]>
    : never
  : NumberRange<L, H, [...R, never]>

type ConstructTuple<
  L extends string | NumberRange<0, 999>,
  R extends unknown[] = []
> = `${L}` extends `${infer A}${infer B}`
  ? ConstructTuple<B, [...TenTimesNumber<R>, ...NumberWithinTen<A>]>
  : R
