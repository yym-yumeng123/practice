function bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  return function (...argu) {
    return fn.call(asThis, ...args, ...argu)
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
