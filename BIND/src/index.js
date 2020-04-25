/**
 * 1. ES3
 */
var slice = Array.prototype.slice
function bind() {
  // 第一个参数 this
  var asThis = arguments[0]
  // 第一个参数不要
  var args = slice.call(arguments, 1)
  // this 就是函数
  var fn = this

  if (typeof fn !== "function") {
    throw new Error("bind 必须调用在函数身上")
  }

  function resultFn() {
    var args2 = slice.call(arguments, 0)
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args.concat(args2)
    )
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}

/**
 * ES6版本的 没有 new
 * @param {arguments[0]} asThis
 * @param  {slice(1)} args
 */
// FIXME: 无 new 的版本
function _bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function (...argu) {
    return fn.call(asThis, ...args, ...argu)
  }
}

function new_bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  function resultFn(...argu) {
    return fn.call(
      // this.__proto__ === resultFn.prototype
      // resultFn.prototype.isPrototypeOf(this)
      this instanceof resultFn ? this : asThis,
      ...args,
      ...argu
    )
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

module.exports = new_bind

if (!Function.prototype.bind) {
  Function.prototype.bind = new_bind
}
