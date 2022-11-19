// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>
]

// ============= Your Code Here =============
type NumberWithinTen<
  T extends string | number,
  R extends unknown[] = []
> = `${R['length']}` extends `${T}` ? R : NumberWithinTen<T, [unknown, ...R]>

type StringToNumberArray<T extends string> = T extends `${infer A}${infer B}`
  ? [NumberWithinTen<A>, ...StringToNumberArray<B>]
  : []

type Reverse<T extends unknown[]> = T extends [infer A, ...infer B]
  ? [...Reverse<B>, A]
  : []

type Shift<T extends unknown[]> = T extends [unknown, ...infer A] ? A : T

type RemoveRightZero<T extends string> = T extends `0${infer A}`
  ? A extends ''
    ? '0'
    : RemoveRightZero<A>
  : T

type SumUnit<
  A extends unknown[] | undefined,
  B extends unknown[] | undefined,
  C extends boolean = false
> = A extends unknown[]
  ? B extends unknown[]
    ? C extends true
      ? [...A, ...B, unknown]
      : [...A, ...B]
    : C extends true
    ? [...A, unknown]
    : A
  : B extends unknown[]
  ? C extends true
    ? [...B, unknown]
    : B
  : C extends true
  ? [unknown]
  : undefined

type BasicSum<
  A extends string | number | bigint,
  B extends string | number | bigint,
  Carry extends boolean = false,
  AInNumberArray extends unknown[][] = Reverse<StringToNumberArray<`${A}`>>,
  BInNumberArray extends unknown[][] = Reverse<StringToNumberArray<`${B}`>>,
  UnitSum extends string = SumUnit<
    AInNumberArray[0],
    BInNumberArray[0],
    Carry
  > extends unknown[]
    ? `${SumUnit<AInNumberArray[0], BInNumberArray[0], Carry>['length']}`
    : ''
> = UnitSum extends `${infer SU1}${infer SU2}`
  ? `${BasicSum<
      A,
      B,
      SU2 extends '' ? false : true,
      Shift<AInNumberArray>,
      Shift<BInNumberArray>
    >}${SU2 extends '' ? SU1 : SU2}`
  : UnitSum

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> =
  // @ts-ignore
  RemoveRightZero<BasicSum<A, B>>
