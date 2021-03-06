## 深拷贝

- 简单理解
   - b是a的一份拷贝, b中没有对a中对象的引用

- 另一种理解
   - b 是 a 的一份拷贝
   - 把 b 和 a 各画出图, a 与 b 没有连结


如何答题:
1. 询问数据类型
2. 询问数据规模
3. 询问性能要求
4. 询问运行环境
5. 询问其他要求


## JSON 序列化
**缺点:**
- 不支持 `function`
- 不支持 `undefined`
- 不支持引用
- 不支持日期 把日期变成字符串
- 不支持正则表达式
- 不支持所有 json 不支持的 ...

```js
const obj = {
  a: 1,
  b: [2, 3],
  c: {
    c1: '1号',
    c2: '2号'
  }
}

const deepObj = JSON.parse(JSON.stringify(obj))
```

## 思路
1. 看数据类型
2. 基本类型直接拷贝
3. Object 分情况
   - 普通Object for in
   - 数组Array初始化
   - 函数 function 怎么拷贝
   - 日期Date 怎么拷贝