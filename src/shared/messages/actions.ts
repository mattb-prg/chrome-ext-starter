import { BackgroundStoreSnapshot, ContentStoreSnapshot, PopupStoreSnapshot } from "../../types";

export function example(foo: number) {
  return {
    foo,
    type: 'EXAMPLE' as const,
  }
}

export function exampleTwo(bar: number) {
  return {
    bar,
    type: 'EXAMPLE_TWO' as const,
  }
}
