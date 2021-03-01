import Message from './types';

export function example(foo: number) {
  return {
    foo,
    type: Message.EXAMPLE as const,
  }
}

export function exampleTwo(bar: number) {
  return {
    bar,
    type: Message.EXAMPLE_TWO as const,
  }
}
