// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<ValidDate<'0102'>, true>>,
  Expect<Equal<ValidDate<'0131'>, true>>,
  Expect<Equal<ValidDate<'1231'>, true>>,
  Expect<Equal<ValidDate<'0229'>, false>>,
  Expect<Equal<ValidDate<'0100'>, false>>,
  Expect<Equal<ValidDate<'0132'>, false>>,
  Expect<Equal<ValidDate<'1301'>, false>>,
  Expect<Equal<ValidDate<'0123'>, true>>,
  Expect<Equal<ValidDate<'01234'>, false>>,
  Expect<Equal<ValidDate<''>, false>>
]

// ============= Your Code Here =============
type MonthDate = {
  '01': 31
  '02': 28
  '03': 31
  '04': 30
  '05': 31
  '06': 30
  '07': 31
  '08': 31
  '09': 30
  '10': 31
  '11': 30
  '12': 31
}

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

type ValidDate<T extends string> = T extends `${infer M1}${infer M2}${infer D}`
  ? GreaterThan<D, 0> extends true
    ? `${M1}${M2}` extends keyof MonthDate
      ? GreaterThan<D, MonthDate[`${M1}${M2}`]> extends true
        ? false
        : true
      : false
    : false
  : false
