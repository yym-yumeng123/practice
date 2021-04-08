// 1. 传一个 number
function echo1(arg: number): number {
  return arg
}

const number = echo1(123)


// 希望传任何类型的
function echo2(arg: any): any {
  return arg
}
const result1 = echo2('1223')
const result2 = echo2(true)

// 泛型: 不预先指定函数的类型, 在使用时在指定函数的类型

/**
 * <T> 类似于占位符
 */
function echo3<T>(arg: T): T {
  return arg
}
const str: string = 'str'
// 传入 string , 返回也是 string
const result4 = echo3(str)
const result5 = echo3(123)

// 泛型 和 tuple
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

const result6 = swap(['122', true])