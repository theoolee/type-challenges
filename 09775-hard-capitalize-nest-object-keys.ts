// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [
    {
      Foo: string
    }
  ]
}

type cases = [Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>]

// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = T extends [infer A, ...infer B]
  ? [CapitalizeNestObjectKeys<A>, ...CapitalizeNestObjectKeys<B>]
  : T extends Record<any, unknown>
  ? {
      [K in keyof T as K extends string | number
        ? Capitalize<`${K}`>
        : K]: T[K] extends object ? CapitalizeNestObjectKeys<T[K]> : T[K]
    }
  : T
