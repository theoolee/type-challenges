// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TrimRight<'str'>, 'str'>>,
  Expect<Equal<TrimRight<'str '>, 'str'>>,
  Expect<Equal<TrimRight<'str     '>, 'str'>>,
  Expect<Equal<TrimRight<'     str     '>, '     str'>>,
  Expect<Equal<TrimRight<'   foo bar  \n\t '>, '   foo bar'>>,
  Expect<Equal<TrimRight<''>, ''>>,
  Expect<Equal<TrimRight<'\n\t '>, ''>>
]

// ============= Your Code Here =============
type TrimLeft<S extends string> = S extends `${infer A}${infer B}`
  ? A extends ' ' | '\n' | '\t'
    ? TrimLeft<B>
    : S
  : S

type TrimRight<S extends string, R extends string = ''> = TrimLeft<S> extends ''
  ? R
  : S extends `${infer A}${infer B}`
  ? TrimRight<B, `${R}${A}`>
  : R
