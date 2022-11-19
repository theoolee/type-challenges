// ============= Test Cases =============
import type { ExpectExtends, ExpectFalse, ExpectTrue } from './test-utils'

declare const example: {
  foo: {
    bar: {
      a: string
    }
    baz: {
      b: number
      c: number
    }
  }
}

type cases = [
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['bar']>, ['a']>>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['baz']>, ['b'] | ['c']>>,
  ExpectTrue<
    ExpectExtends<
      Path<typeof example['foo']>,
      ['bar'] | ['baz'] | ['bar', 'a'] | ['baz', 'b'] | ['baz', 'c']
    >
  >,
  ExpectFalse<ExpectExtends<Path<typeof example['foo']['bar']>, ['z']>>
]

// ============= Your Code Here =============
type Path<T, K extends keyof T = keyof T> = K extends unknown
  ? T[K] extends Record<any, unknown>
    ? [K] | [K, ...Path<T[K]>]
    : [K]
  : never
