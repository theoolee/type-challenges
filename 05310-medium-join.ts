// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>
]

// ============= Your Code Here =============
type Join<
  T extends string[],
  U extends string | number,
  I extends unknown[] = [],
  R extends string = ''
> = I['length'] extends T['length']
  ? R
  : I['length'] extends 0
  ? Join<T, U, [...I, unknown], T[0]>
  : Join<T, U, [...I, unknown], `${R}${U}${T[I['length']]}`>
