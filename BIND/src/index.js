function bind(asThis) {
  // this 就是函数
  const fn = this
  return function () {
    return fn.call(asThis)
  }
}

module.exports = bind

if (!Function.prototype.bind) {
  Function.prototype.bind = bind
}
