// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
  Expect<
    Equal<
      OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>,
      'b' | 'c' | 'd'
    >
  >,
  Expect<Equal<OptionalKeys<{}>, never>>
]

// ============= Your Code Here =============
type OptionalKeys<
  T,
  R extends Record<keyof T, unknown> = Required<T>,
  K extends keyof T = keyof T
> = K extends unknown ? (T[K] extends R[K] ? never : K) : never
