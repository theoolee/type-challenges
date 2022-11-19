// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
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

type Trim<S extends string> = TrimLeft<TrimRight<S>>
