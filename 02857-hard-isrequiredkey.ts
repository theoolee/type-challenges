// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>
]

// ============= Your Code Here =============
type RequiredKeys<
  T,
  R extends Record<keyof T, unknown> = Required<T>,
  K extends keyof T = keyof T
> = K extends unknown ? (T[K] extends R[K] ? K : never) : never

type IsRequiredKey<T, K extends keyof T> = [K] extends [RequiredKeys<T>]
  ? true
  : false
