// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>
]

// ============= Your Code Here =============
type AssertCapital<S extends string> = S extends Capitalize<S>
  ? S extends Uncapitalize<S>
    ? false
    : true
  : false

type KebabCase<S> = S extends `${infer A}${infer B}`
  ? `${Lowercase<A>}${AssertCapital<B> extends true
      ? `-${KebabCase<Uncapitalize<B>>}`
      : KebabCase<B>}`
  : S
