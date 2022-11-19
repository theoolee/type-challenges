// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries =
  | ['name', string]
  | ['age', number]
  | ['locations', string[] | null]

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>]

// ============= Your Code Here =============
type ObjectFromEntries<T extends [string | number | symbol, unknown]> = {
  [E in T as E[0]]: E[1]
}
