// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
]

// ============= Your Code Here =============
type NormalizeIndex<
  T extends unknown[],
  I extends number,
  P extends unknown[] = []
> = `${I}` extends `-${infer N}`
  ? `${P['length']}` extends N
    ? T['length']
    : T extends [...infer A, infer B]
    ? NormalizeIndex<A, I, [...P, B]>
    : T['length']
  : I

type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length'],
  NStart extends number = NormalizeIndex<Arr, Start>,
  NEnd extends number = NormalizeIndex<Arr, End>,
  I extends unknown[] = []
> = I['length'] extends NEnd | Arr['length']
  ? []
  : I['length'] extends NStart
  ? [...I, unknown]['length'] extends number
    ? [
        Arr[I['length']],
        ...Slice<
          Arr,
          Start,
          End,
          [...I, unknown]['length'],
          NEnd,
          [...I, unknown]
        >
      ]
    : never
  : Slice<Arr, Start, End, NStart, NEnd, [...I, unknown]>
