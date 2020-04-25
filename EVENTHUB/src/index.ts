// 发布订阅模式
class EventHub {
  /**
   * 'A报纸': [fn1, fn2...]
   * 'B报纸: [fn1, fn2...]
   */
  private cache: { [key: string]: Array<(data: unknown) => void> } = {}

  // 注册 or 监听事件
  on(eventName: string, fn: (data: unknown) => void) {
    // 把 fn 推进 this.cache[eventname] 数组
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }

  // 触发事件
  emit(eventName: string, params?: unknown) {
    // 把 this.cache[eventName] 数组里面的 fn 依次调用
    ;(this.cache[eventName] || []).forEach((fn) => fn(params))
  }

  // 把 fn 从 this.cache[eventname] 数组 删除
  off(eventName: string, fn: (data: unknown) => void) {
    let index = indexOf(this.cache[eventName], fn)
    if (index === -1) return
    this.cache[eventName].splice(index, 1)
  }
}

export default EventHub

/**
 * helper indexOf
 * @param array
 * @param item
 */
function indexOf(array, item) {
  if (array === undefined) {
    return -1
  }
  let index = -1
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i
      break
    }
  }

  return index
}
