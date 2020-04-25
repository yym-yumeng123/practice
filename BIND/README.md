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