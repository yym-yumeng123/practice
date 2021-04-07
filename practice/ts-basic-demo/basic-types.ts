let isDone: boolean = false

let age: number = 15
let binaryNumber: number = 0b1111

let firstName: string = 'yym'
let message: string = `Hello ${firstName}`

// undefined null 区别
let u: undefined = undefined
let n: null = null

// undefined null 是所有类型的子类型
let num: number = undefined

// 无法确定类型 any
let notSure: any = 4
notSure = true
notSure = 'yym'
notSure.myName

// 允许部分类型: 联合类型 |
let numberOrString: number | string = '111'
numberOrString = 123



