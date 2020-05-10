## Promise 的完整API

**Promise 是一个类**

- JS 里类是一个特殊的函数
- 类属性: `length`
- 类方法: `all / allSelected / race / reject / resolve`
- 对象属性: `then / finally / catch`
- 对象内部属性: `state = pending / fulfilled / rejected` 



```
mocha chai sinon

mocha 测试运行器

chai 断言库

sinon 函数测试库

sinon 和 chai 合作, 需要安扎实能 sinon-chai
```

```js
// sinon 作用

不使用 sinon
it('new Promise(fn) 中的 fn 会立即执行', () => {
  let called = false
  const promise = new Promise(() => {
    called = true
  })
  // @ts-ignore
  assert(called === true)
});
```