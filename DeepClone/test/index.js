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
})
