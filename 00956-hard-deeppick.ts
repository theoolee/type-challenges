// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<
    Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
]

// ============= Your Code Here =============
type Wrap<T> = (a: [T]) => any

type Unwrap<U> = [U] extends [(arg: [infer T]) => any] ? T : never

type DeepPickToUnion<
  T,
  U extends string,
  W extends boolean = true
> = U extends keyof T
  ? W extends true
    ? Wrap<{
        [K in U]: T[K]
      }>
    : {
        [K in U]: T[K]
      }
  : W extends true
  ? Wrap<
      U extends `${infer A}.${infer B}`
        ? A extends keyof T
          ? {
              [K in A]: DeepPickToUnion<T[K], B, false>
            }
          : unknown
        : unknown
    >
  : U extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? {
        [K in A]: DeepPickToUnion<T[K], B, false>
      }
    : unknown
  : unknown

type DeepPick<T, U extends string> = Unwrap<DeepPickToUnion<T, U>>
