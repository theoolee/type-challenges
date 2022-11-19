// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string
        prop: { another_prop: string }
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ]
      }>,
      {
        someProp: string
        prop: { anotherProp: string }
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ]
      }
    >
  >
]

// ============= Your Code Here =============
type CamelCase<
  S extends string,
  T extends string = Lowercase<S>
> = T extends `${infer A}${infer B}`
  ? A extends '_'
    ? CamelCase<S, Capitalize<B>>
    : `${A}${CamelCase<S, Lowercase<B>>}`
  : T

type Camelize<T> = T extends unknown[]
  ? T extends [infer A, ...infer B]
    ? [Camelize<A>, ...Camelize<B>]
    : T
  : {
      [K in keyof T as K extends string
        ? CamelCase<K>
        : K]: T[K] extends Record<any, any> ? Camelize<T[K]> : T[K]
    }
