// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
]

// ============= Your Code Here =============
type Fibonacci<
  T extends number,
  P extends unknown[] = [],
  N extends unknown[] = [unknown],
  I extends unknown[] = [unknown]
> = I['length'] extends T
  ? N['length']
  : Fibonacci<T, N, [...N, ...P], [unknown, ...I]>
