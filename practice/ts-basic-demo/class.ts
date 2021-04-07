/**
 * 修饰符
 * 1. public 公有的
 * 2. private 私有的
 * 3. protected 保护, 只能继承
 * 4. readonly 只读
 * 5. static 静态
 */
class Animal {
  readonly name: string
  static categoies: string[] = ["animal", "bird"]
  static isAnimal(a) {
    return a instanceof Animal
  }
  constructor(name: string) {
    this.name = name
  }

  run() {
    return `${this.name} is running`
  }
}

const snake = new Animal("yym")
console.log(snake.run())
console.log(snake.name)
// snake.name = "改名字"
console.log(snake.name)

class Dog extends Animal {
  bark() {
    return `${this.name} is bark`
  }
}

const dog = new Dog("xiao")
console.log(dog.bark())
console.log(dog.run())

class Cat extends Animal {
  constructor(name) {
    super(name)
    console.log(this.name)
  }
  run() {
    return "Memo, " + super.run()
  }
}
const mao = new Cat("mao")
console.log(mao.run())

// 私有 private
class Animal1 {
  private name: string
  constructor(name: string) {
    this.name = name
  }

  run() {
    return `${this.name} is running`
  }
}

const snake1 = new Animal1("yym")
console.log(snake1.run())
// 属性“name”为私有属性，只能在类“Animal1”中访问
// console.log(snake1.name);

/**
 * 类和接口
 */

interface Radio {
  switchRadio(): void
}

interface Battery {
  check()
}

class Car implements Radio, Battery {
  switchRadio() {}
  check() {}
}

class CellPhone implements Radio, Battery {
  switchRadio() {}
  check() {}
}
