// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number; b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined }>, 'a'>>,
  Expect<
    Equal<
      RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }>,
      'a' | 'c' | 'd'
    >
  >,
  Expect<Equal<RequiredKeys<{}>, never>>
]

// ============= Your Code Here =============
type RequiredKeys<
  T,
  R extends Record<keyof T, unknown> = Required<T>,
  K extends keyof T = keyof T
> = K extends unknown ? (T[K] extends R[K] ? K : never) : never
