// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<
    Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>
  >
]

// ============= Your Code Here =============
type GetRequired<T, R extends Record<keyof T, unknown> = Required<T>> = {
  [K in keyof T as T[K] extends R[K] ? K : never]: T[K]
}
