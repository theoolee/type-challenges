// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>
]

// ============= Your Code Here =============
type NumberWithinTen<
  T extends string | number,
  R extends unknown[] = []
> = `${R['length']}` extends `${T}` ? R : NumberWithinTen<T, [unknown, ...R]>

type StringToCharArray<T extends string> = T extends `${infer A}${infer B}`
  ? [A, ...StringToCharArray<B>]
  : []

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

type MultiplyWithinTen<
  A extends unknown[],
  B extends unknown[]
> = B['length'] extends 0 ? [] : [...A, ...MultiplyWithinTen<A, Shift<B>>]

type MultiplyUnit<
  A extends unknown[] | undefined,
  B extends unknown[] | undefined,
  Carry extends unknown[] = []
> = A extends unknown[]
  ? B extends unknown[]
    ? [...Carry, ...MultiplyWithinTen<A, B>]
    : Carry['length'] extends 0
    ? unknown
    : Carry
  : Carry['length'] extends 0
  ? unknown
  : Carry

type BasicMultiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
  C extends unknown[] = [],
  AInNumberArray extends unknown[][] = Reverse<StringToNumberArray<`${A}`>>,
  BInNumber extends unknown[] = NumberWithinTen<`${B}`>,
  UnitResult extends string = MultiplyUnit<
    AInNumberArray[0],
    BInNumber,
    C
  > extends unknown[]
    ? // @ts-ignore
      `${MultiplyUnit<AInNumberArray[0], BInNumber, C>['length']}`
    : ''
> = UnitResult extends `${infer MU1}${infer MU2}`
  ? `${BasicMultiply<
      A,
      B,
      MU2 extends '' ? [] : NumberWithinTen<MU1>,
      Shift<AInNumberArray>,
      BInNumber
    >}${MU2 extends '' ? MU1 : MU2}`
  : UnitResult

type SumProduct<
  Product extends unknown[],
  Result extends string = '0',
  LeftZero extends string = ''
> = Product extends [infer A, ...infer B]
  ? // @ts-ignore
    SumProduct<B, Sum<Result, `${A}${LeftZero}`>, `${LeftZero}0`>
  : Result

type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
  BInCharArray extends string[] = Reverse<StringToCharArray<`${B}`>>,
  Product extends string[] = []
> = BInCharArray['length'] extends 0
  ? SumProduct<Product>
  : Multiply<
      A,
      B,
      Shift<BInCharArray>,
      [...Product, BasicMultiply<A, BInCharArray[0]>]
    >
