// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>
]

// ============= Your Code Here =============
type NumberChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

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
  S extends string | number,
  R extends unknown[] = []
> = `${S}` extends `${infer A}${infer B}`
  ? A extends NumberChar
    ? B extends ''
      ? [...TenTimesNumber<R>, ...NumberWithinTen<A>]['length']
      : ToNumber<B, [...TenTimesNumber<R>, ...NumberWithinTen<A>]>
    : never
  : never
