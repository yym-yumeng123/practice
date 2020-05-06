import * as chai from "chai"
import Promise from "../src/promise"
const assert = chai.assert

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

  it('new Promise(fn) 中的 fn 会立即执行', () => {
    let called = false
    const promise = new Promise(() => {
      called = true
    })
    // @ts-ignore
    assert(called === true)
  });
  
})
