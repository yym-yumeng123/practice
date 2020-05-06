class Promise {
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接收函数")
    }
    fn()
  }

  then() {}
}

export default Promise
