// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>
      ]
    },
  },
})

// ============= Your Code Here =============
type Prop<T> = T extends unknown[]
  ? Prop<T[number]>
  : T extends StringConstructor
  ? string
  : T extends BooleanConstructor
  ? boolean
  : T extends NumberConstructor
  ? number
  : T extends new (...args: any[]) => infer R
  ? R
  : any

type Props<T> = {
  [K in keyof T]: T[K] extends {
    type: unknown
  }
    ? Prop<T[K]['type']>
    : Prop<T[K]>
}

type Computed<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any
    ? K
    : never]: T[K] extends (...args: any[]) => infer R ? R : never
}

type Options<P, D, C, M> = {
  props?: P
  data?: (this: Props<P>) => D
  computed?: C & ThisType<Props<P> & D & Computed<C> & M>
  methods?: M & ThisType<Props<P> & D & Computed<C> & M>
}

declare function VueBasicProps<P, D, C, M>(
  options: Options<P, D, C, M>
): unknown
