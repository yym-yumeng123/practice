Bind: Function.protitype

polyfill: 把一些坑填平

```js
// 检测存不存在, 填坑行为 就是 polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = function () {}
}
```

```
fn.bind(asThis)

fn.bind(asThis, p1, p2)

fn.bind(asThis)(p1, p2)
```

支持 new
```js
new fn(x)

1. const temp = {}
2. this.__proto__ = fn.prototype  // new 为 true , 非 new 为 false
3. fn.call(temp, 'x')
4. return this 在fn 的最后一行
```