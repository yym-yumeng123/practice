import * as chai from "chai"
import * as sinon from "sinon"
import * as sinonChai from "sinon-chai"
chai.use(sinonChai)
const assert = chai.assert

import Promise from "../src/promise"

// 描述
describe("Promise", () => {
  it("是一个类", () => {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })

  it("new Promise() 必须接受一个函数", () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise()
    })
    assert.throw(() => {
      // @ts-ignore
      new Promise("42")
    })
  })

  it("new Promise(fn) 会生成一个对象, 对象有 then 方法", () => {
    const promise = new Promise(() => {})
    assert.isFunction(promise.then)
  })

  it("new Promise(fn) 中的 fn 会立即执行", () => {
    let fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  })

  // done 运行结束才执行
  it("new Promise(fn) 中的 fn 执行时 接收 resolve 和 reject 两个函数", (done) => {
    const promise = new Promise((resolve, reject) => {
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })

  it("promise.then(success) 中的 success 会在 resolve被调用的时候执行 ", (done) => {
    const success = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(success.called)
      resolve()
      setTimeout(() => {
        assert.isTrue(success.called)
        done()
      })
    })

    promise.then(success)
  })

  it("promise.then(null, fail) 中的 fail 会在 rejected 被调用的时候执行 ", (done) => {
    const fail = sinon.fake()
    const promise = new Promise((resolve, reject) => {
      assert.isFalse(fail.called)
      reject()
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      })
    })

    promise.then(null, fail)
  })

  describe("2.2 then 方法", () => {
    describe("2.2.1 onFulfilled 和 onRejected 都是可选参数", () => {
      it("2.2.1.1 如果 onFulfilled 不是函数，它会被忽略, 如果 onRejected 不是函数，它会被忽略", () => {
        const promise = new Promise((resolve) => {
          resolve()
        })
        promise.then(false, () => {})
        assert(1 === 1)
      })
    })

    describe("2.2.2 如果 onFulfilled 是一个函数：", () => {
      it("2.2.2.1: 它一定是在 promise 是 fulfilled 状态后调用，并且接受一个参数 value, 2.2.2.2: 它一定是在 promise 是 fulfilled 状态后调用, 2.2.2.3: 它最多被调用一次", (done) => {
        const succeed = sinon.fake()
        const promise = new Promise((resolve) => {
          assert.isFalse(succeed.called)
          resolve("firstParams")
          resolve("firstParamsOne")

          setTimeout(() => {
            assert.isTrue(succeed.calledOnce)
            assert(promise.state === "fulfilled")
            assert(succeed.calledWith("firstParams"))
            done()
          }, 0)
        })
        promise.then(succeed)
      })
    })
  })
})
