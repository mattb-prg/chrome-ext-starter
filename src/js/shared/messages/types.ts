export const MessageType = {
  EXAMPLE: litStr('EXAMPLE'),
  EXAMPLE_TWO: litStr('EXAMPLE_TWO'),
}

function litStr<S extends string>(str: S) {
  return str as S
}
