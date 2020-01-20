import { BackgroundStoreSnapshot, ContentStoreSnapshot, PopupStoreSnapshot } from "../../types";
import { MessageType } from "./types";

export function example(foo: number) {
  return {
    foo,
    type: MessageType.EXAMPLE,
  }
}

export function exampleTwo(bar: number) {
  return {
    bar,
    type: MessageType.EXAMPLE_TWO,
  }
}
