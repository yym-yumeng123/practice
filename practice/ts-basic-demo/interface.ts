/**
 * 定义对象的类型
 * Interface 接口
 * 1. 对对象的形状进行描述
 * 2. 对 类 进行抽象
 * 3. Duck Typing(鸭子类型)
 */
interface Person {
  name: string
  age: number
}

let yym: Person = {
  name: "yym",
  age: 20,
}

// 可选属性 ?
interface IProps {
  name?: string
  age?: number
}

// 只读属性 readonly
interface IReadonlyProps {
  readonly id: number
  name?: string
  age: number
}

// const 只读用在定义变量
// readonly 用在定义属性只读
