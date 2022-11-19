// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>
]

// ============= Your Code Here =============
type Join<T extends string, U extends string[]> = U extends [
  infer A,
  ...infer B
]
  ? B['length'] extends 0
    ? A
    : A extends string
    ? B extends string[]
      ? `${A}${T}${Join<T, B>}`
      : never
    : never
  : ''

declare function join<T extends string>(
  delimiter: T
): <U extends string[]>(...parts: U) => Join<T, U>
