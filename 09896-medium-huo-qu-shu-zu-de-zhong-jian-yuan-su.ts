// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<
    Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>
  >,
  Expect<
    Equal<
      GetMiddleElement<[() => string, () => number]>,
      [() => string, () => number]
    >
  >,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>

// ============= Your Code Here =============
type Double<T extends unknown[]> = [...T, ...T]

type GetMiddleElement<
  T extends unknown[],
  I extends unknown[] = []
> = I['length'] extends T['length']
  ? []
  : [...I, unknown]['length'] extends number
  ? [...Double<I>, unknown]['length'] extends T['length']
    ? [T[I['length']]]
    : Double<[...I, unknown]>['length'] extends T['length']
    ? [T[I['length']], T[[...I, unknown]['length']]]
    : GetMiddleElement<T, [...I, unknown]>
  : never
