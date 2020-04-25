const bind = require('../src/index.js')
Function.prototype.bind2 = bind

console.assert(Function.prototype.bind2 !== undefined)

const fn = function() {
  return this
}
const newFn = fn.bind2({name: 'yym'})
console.assert(newFn().name === 'yym')

const fn1 = function(p1, p2) {
  return [this, p1, p2]
}
const newFn1 = fn1.bind2({name: 'yym'}, '123', '456')
console.assert(newFn1()[0].name === 'yym')
console.assert(newFn1()[1] === '123')
console.assert(newFn1()[2] === '456')

const anotherFn = fn1.bind2({name: 'yym'})
console.log(anotherFn('p1', 'p2')) // [ { name: 'yym' }, 'p1', 'p2' ]
console.assert(anotherFn('p1', 'p2')[0].name === 'yym', 'this')
console.assert(anotherFn('p1', 'p2')[1] === 'p1', 'p1')
console.assert(anotherFn('p1', 'p2')[2] === 'p2', 'p2')