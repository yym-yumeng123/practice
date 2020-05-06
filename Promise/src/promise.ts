class Promise {
  succeed = null
  fail = null
  constructor(fn) {
    if (typeof fn !== "function") {
      throw new Error("我只接收函数")
    }
    const resolve = () => {
      setTimeout(() => {
        this.succeed()
      }, 0)
    }
    const reject = () => {
      setTimeout(() => {
        this.fail()
      }, 0)
    }
    fn(resolve, reject)
  }

  then(succeed, fail) {
    this.succeed = succeed
    this.fail = fail
  }
}

export default Promise
