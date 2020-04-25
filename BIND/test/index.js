const bind = require('../src/index.js')
Function.prototype.bind2 = bind

console.assert(Function.prototype.bind2 !== undefined)

const fn = function() {
  return this
}
const newFn = fn.bind2({name: 'yym'})
console.assert(newFn().name === 'yym')