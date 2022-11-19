// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<
    Equal<
      AllCombinations<'ABC'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'AB'
      | 'AC'
      | 'BA'
      | 'BC'
      | 'CA'
      | 'CB'
      | 'ABC'
      | 'ACB'
      | 'BAC'
      | 'BCA'
      | 'CAB'
      | 'CBA'
    >
  >,
  Expect<
    Equal<
      AllCombinations<'ABCD'>,
      | ''
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'AB'
      | 'AC'
      | 'AD'
      | 'BA'
      | 'BC'
      | 'BD'
      | 'CA'
      | 'CB'
      | 'CD'
      | 'DA'
      | 'DB'
      | 'DC'
      | 'ABC'
      | 'ABD'
      | 'ACB'
      | 'ACD'
      | 'ADB'
      | 'ADC'
      | 'BAC'
      | 'BAD'
      | 'BCA'
      | 'BCD'
      | 'BDA'
      | 'BDC'
      | 'CAB'
      | 'CAD'
      | 'CBA'
      | 'CBD'
      | 'CDA'
      | 'CDB'
      | 'DAB'
      | 'DAC'
      | 'DBA'
      | 'DBC'
      | 'DCA'
      | 'DCB'
      | 'ABCD'
      | 'ABDC'
      | 'ACBD'
      | 'ACDB'
      | 'ADBC'
      | 'ADCB'
      | 'BACD'
      | 'BADC'
      | 'BCAD'
      | 'BCDA'
      | 'BDAC'
      | 'BDCA'
      | 'CABD'
      | 'CADB'
      | 'CBAD'
      | 'CBDA'
      | 'CDAB'
      | 'CDBA'
      | 'DABC'
      | 'DACB'
      | 'DBAC'
      | 'DBCA'
      | 'DCAB'
      | 'DCBA'
    >
  >
]

// ============= Your Code Here =============
type StringToCharArray<
  S extends string,
  U extends string[] = []
> = S extends `${infer A}${infer B}` ? StringToCharArray<B, [...U, A]> : U

type AllCombinations<
  S extends string,
  R extends string = '',
  U1 extends string = StringToCharArray<S>[number],
  U2 extends string = U1
> = [U1] extends [never]
  ? R
  : U1 extends U2
  ? R | AllCombinations<S, `${R}${U1}`, Exclude<U2, U1>>
  : never
