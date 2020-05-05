const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
chai.use(sinonChai)

const assert = chai.assert
const deepClone = require("../src/index.js")

describe("deepClone", () => {
  it("是个函数", () => {
    assert.isFunction(deepClone)
  })
  it("能够赋值基本类型", () => {
    const num = 42
    const num2 = deepClone(num)
    assert(num === num2)

    const str = "42"
    const str2 = deepClone(str)
    assert(str === str2)

    const bool = true
    const bool2 = deepClone(bool)
    assert(bool === bool2)

    const unde = undefined
    const unde2 = deepClone(unde)
    assert(unde === unde2)

    const empty = null
    const empty2 = deepClone(empty)
    assert(empty === empty2)

    const sym = Symbol()
    const sym2 = deepClone(sym)
    assert(sym === sym2)
  })

  describe("对象", () => {
    it("能够复制普通对象", () => {
      const obj = {
        name: "yym",
        child: {
          name: "zs",
        },
      }
      const obj2 = deepClone(obj)

      assert(obj !== obj2)
      assert(obj.name === obj2.name)
      assert(obj.child !== obj2.child)
      assert(obj.child.name === obj2.child.name)
    })

    it("能够复制数组对象", () => {
      const arr = [
        [1, 2],
        [3, 4],
        [5, 6],
      ]
      const arr2 = deepClone(arr)

      assert(arr !== arr2)
      assert(arr[0] !== arr2[0])
      assert(arr[1] !== arr2[1])
      assert(arr[2] !== arr2[2])
      assert.deepEqual(arr, arr2)
    })

    it("能够复制函数", () => {
      const fn = function () {
        return 1
      }
      fn.obj = {
        name: {
          age: 12,
        },
      }
      const fn2 = deepClone(fn)
      assert(fn !== fn2)
      assert(fn.obj.name.age === fn2.obj.name.age)
      assert(fn.obj.name !== fn2.obj.name)
      assert(fn.obj !== fn2.obj)
      assert(fn() === fn2())
    })
  })
})
