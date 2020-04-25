const bind = require("../src/index.js")
const new_bind = require("../src/index.js")

test1('fn.bind 能用')
test2('this 绑定成功')
test3('this p1 p2 绑定成功')
test4('this 成功, 后传参数成功')
test5('new 的时候绑定了 p1, p2')
test6('new 的时候绑定了 p1, p2, 并调用 prototype')
test7('bind this 调用 new fn()')


function test1(message) {
  Function.prototype.bind2 = bind
  console.assert(Function.prototype.bind2 !== undefined)
  console.log(message)
}

function test2(message) {
  Function.prototype.bind2 = bind
  const fn = function () {
    return this
  }
  const newFn = fn.bind2({ name: "yym" })
  console.assert(newFn().name === "yym")
  console.log(message)
}

function test3(message) {
  Function.prototype.bind2 = bind
  const fn1 = function (p1, p2) {
    return [this, p1, p2]
  }
  const newFn1 = fn1.bind2({ name: "yym" }, "123", "456")
  console.assert(newFn1()[0].name === "yym")
  console.assert(newFn1()[1] === "123")
  console.assert(newFn1()[2] === "456")
  console.log(message)
}

function test4(message) {
  Function.prototype.bind2 = bind

  const fn1 = function (p1, p2) {
    return [this, p1, p2]
  }
  const anotherFn = fn1.bind2({ name: "yym" })
  console.log(anotherFn("p1", "p2")) // [ { name: 'yym' }, 'p1', 'p2' ]
  console.assert(anotherFn("p1", "p2")[0].name === "yym", "this")
  console.assert(anotherFn("p1", "p2")[1] === "p1", "p1")
  console.assert(anotherFn("p1", "p2")[2] === "p2", "p2")
  console.log(message)
}

function test5(message) {
  Function.prototype.bind2 = new_bind
  console.log(message)

  const fn = function(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  const fn2 = fn.bind2(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object.p1 === 'x')
  console.assert(object.p2 === 'y')
  console.log(object)
}

function test6(message) {
  Function.prototype.bind2 = new_bind
  console.log(message)

  const fn = function(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function(){}
  const fn2 = fn.bind2(undefined, 'x', 'y')
  const object = new fn2()
  console.assert(object.p1 === 'x')
  console.assert(object.p2 === 'y')
  console.assert(object.__proto__ === fn.prototype, 'proto...')
  console.assert(typeof object.sayHi === 'function', 'is function')
}

function test7(message) {
  Function.prototype.bind2 = new_bind
  console.log(message)

  const fn = function(p1, p2) {
    this.p1 = p1
    this.p2 = p2
  }
  fn.prototype.sayHi = function(){}
  const fn2 = fn.bind2(new fn(), 'x', 'y')
  const object = fn2()
  console.assert(object === undefined, 'test7, undefined')
}