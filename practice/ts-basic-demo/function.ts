/**
 * 函数声明
 * 输入, 输出
 */
function add(x: number, y: number): number {
  return x + y
}
let result = add(3, 5)

/**
 * 可选参数 只能放在最后一个
 */
function add2(x: number, y: number, z?: number): number {
  return typeof z === "number" ? x + y + z : x + y
}

/**
 * 默认参数 ==> 可选参数
 */
function add3(x: number, y: number, z: number = 10): number {
  return typeof z === "number" ? x + y + z : x + y
}

/**
 * ts 可以类型推断
 * 函数表达式
 * 箭头, 不是 es6, 而是 ts 声明返回值类型的方法
 * const add4: (x: number, y: number, z?: number) => number
 */
const add4 = (x: number, y: number, z: number = 10): number => {
  return typeof z === "number" ? x + y + z : x + y
}

const add5: (x: number, y: number, z?: number) => number = add4

// ts 会在我们没有指定类型时, 会给我们推论出一个类型
