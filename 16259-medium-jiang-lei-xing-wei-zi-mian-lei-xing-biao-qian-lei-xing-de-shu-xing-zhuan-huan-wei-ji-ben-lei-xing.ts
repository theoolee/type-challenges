// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
}

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>]

// ============= Your Code Here =============
type ToPrimitive<T> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? ToPrimitive<T[K]>
    : T[K] extends number
    ? number
    : T[K] extends string
    ? string
    : T[K] extends boolean
    ? boolean
    : never
}
