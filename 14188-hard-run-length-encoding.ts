// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>
]

// ============= Your Code Here =============
namespace RLE {
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
    C extends string,
    R extends unknown[] = []
  > = `${R['length']}` extends `${T}` ? R : NumberWithinTen<T, C, [C, ...R]>

  type ToNumber<
    T extends string | number,
    C extends string,
    R extends unknown[] = []
  > = `${T}` extends `${infer A}${infer B}`
    ? ToNumber<B, C, [...TenTimesNumber<R>, ...NumberWithinTen<A, C>]>
    : R

  type ArrayToString<T extends unknown[]> = T extends [infer A, ...infer B]
    ? A extends string
      ? `${A}${ArrayToString<B>}`
      : ArrayToString<B>
    : ''

  type RepeatChar<T extends string, R extends string | number> = ArrayToString<
    ToNumber<R, T>
  >

  export type Encode<
    S extends string,
    C extends string[] = []
  > = S extends `${infer A}${infer B}`
    ? C['length'] extends 0
      ? Encode<B, [A]>
      : C[0] extends A
      ? Encode<B, [...C, A]>
      : `${C['length'] extends 1 ? '' : C['length']}${C[0]}${Encode<S, []>}`
    : `${C['length'] extends 1 ? '' : C['length']}${C[0]}`

  export type Decode<
    S extends string,
    C extends string = ''
  > = S extends `${infer A}${infer B}`
    ? A extends `${number}`
      ? Decode<B, `${C}${A}`>
      : `${C extends '' ? A : RepeatChar<A, C>}${Decode<B>}`
    : S
}
