class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }

  run() {
    return `${this.name} is running`
  }
}

const snake = new Animal("yym")
console.log(snake.run())

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
