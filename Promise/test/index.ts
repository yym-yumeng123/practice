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

    describe("2.2.3 如果 onRejected 是一个函数：", () => {
      it("2.2.3.1 它一定在 promise 是 rejected 状态后调用，并且接受一个参数 reason, 2.2.3.2 它一定在 promise 是 rejected 状态后调用, 2.2.3.3: 它最多被调用一次", (done) => {
        const fail = sinon.fake()
        const promise = new Promise((resolve, reject) => {
          assert.isFalse(fail.called)
          reject("firstParams")
          reject("firstParamsOne")

          setTimeout(() => {
            assert.isTrue(fail.calledOnce)
            assert(promise.state === "rejected")
            assert(fail.calledWith("firstParams"))
            done()
          }, 0)
        })
        promise.then(null, fail)
      })
    })

    /**
     * @param { 在我的代码执行完之前, 不得调用 then 后面的两个函数}
     */
    it("2.2.4 onFulfilled 或 onRejected 只在执行环境堆栈只包含平台代码之后调用", (done) => {
      const succeed = sinon.fake()
      const promise = new Promise((resolve) => {
        resolve()
      })

      promise.then(succeed)
      assert.isFalse(succeed.called)
      setTimeout(() => {
        assert.isTrue(succeed.called)
        done()
      })
    })
    it("2.2.4 失败情况测试", (done) => {
      const fail = sinon.fake()
      const promise = new Promise((resolve, reject) => {
        reject()
      })

      promise.then(null, fail)
      assert.isFalse(fail.called)
      setTimeout(() => {
        assert.isTrue(fail.called)
        done()
      })
    })

    it("2.2.5 onFulfilled 和 onRejected 会作为函数形式调用 (也就是说，默认 this 指向 global，严格模式 undefined)", (done) => {
      const promise = new Promise((resolve) => {
        resolve()
      })

      promise.then(function () {
        "use strict"
        assert(this === undefined)
        done()
      })
    })

    describe("2.2.6", () => {
      it("promise 的 then 可以链式调用多次", done => {
        const promise = new Promise((resolve) => {
          resolve()
        })

        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
        promise.then(callbacks[0])
        promise.then(callbacks[1])
        promise.then(callbacks[2])

        setTimeout(() => {
          assert(callbacks[0].called)
          assert(callbacks[1].called)
          assert(callbacks[2].called)
          done()
        }, 0)
      })

      it('2.2.6.1 如果或当 promise 转态是 fulfilled 时，所有的 onFulfilled 回调回以他们注册时的顺序依次执行', done => {
        const promise = new Promise((resolve) => {
          resolve()
        })

        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
        promise.then(callbacks[0])
        promise.then(callbacks[1])
        promise.then(callbacks[2])

        setTimeout(() => {
          assert(callbacks[0].called)
          assert(callbacks[1].called)
          assert(callbacks[2].called)
          assert(callbacks[1].calledAfter(callbacks[0]))
          assert(callbacks[2].calledAfter(callbacks[1]))
          done()
        }, 0)
      });

      it('2.2.6.2 如果或当 promise 转态是 rejected 时，所有的 onRejected 回调回以他们注册时的顺序依次执行', done => {
        const promise = new Promise((resolve, reject) => {
          reject()
        })

        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
        promise.then(null, callbacks[0])
        promise.then(null,callbacks[1])
        promise.then(null, callbacks[2])

        setTimeout(() => {
          assert(callbacks[0].called)
          assert(callbacks[1].called)
          assert(callbacks[2].called)
          assert(callbacks[1].calledAfter(callbacks[0]))
          assert(callbacks[2].calledAfter(callbacks[1]))
          done()
        }, 0)
      });
      
      
    })
  })
})
