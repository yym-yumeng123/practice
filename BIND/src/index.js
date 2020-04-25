var slice = Array.prototype.slice

function bind() {
  // 第一个参数 this
  var asThis = arguments[0]
  // 第一个参数不要
  var args = slice.call(arguments, 1)
  // this 就是函数
  var fn = this

  if(typeof fn !== 'function') {
    throw new Error('bind 必须调用在函数身上')
  }

  return function () {
    var args2 = slice.call(arguments, 0)
    // return fn.call(asThis, ...args, ...argu)
    return fn.apply(asThis, args.concat(args2))
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}

/**
 * ES6版本的
 * @param {arguments[0]} asThis 
 * @param  {slice(1)} args 
 */
function _bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function (...argu) {
    return fn.call(asThis, ...args, ...argu)
  }
}