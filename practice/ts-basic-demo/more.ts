/**
 * 类型别名: type aliases
 */

type PlusType = (x: number, y: number) => number
function sum(x: number, y: number): number {
  return x + y
}

const sum2: PlusType = sum

// ----------------------------------

type NameResolver = () => string
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver): string {
  if (typeof n === "string") {
    return n
  } else {
    return n()
  }
}

/**
 * 类型断言 type assertion
 * as
 */
function getLength(input: string | number): number {
  // 第一种断言 as
  // const str = input as string
  // if (str.length) {
  //   return str.length
  // } else {
  //   const number = input as Number
  //   return number.toString().length
  // }

  // 第二种断言
  if ((<string>input).length) {
    return (<string>input).length
  }
}

jQuery('#abc')