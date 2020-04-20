// 发布订阅模式
class EventHub {
	/**
	 * 'A报纸': [fn1, fn2...]
	 * 'B报纸: [fn1, fn2...]
	 */
	cache = {}

  // 注册 or 监听事件
  on(eventName, fn) {
		// 把 fn 推进 this.cache[eventname] 数组
		this.cache[eventName] = this.cache[eventName] || []
		this.cache[eventName].push(fn)
	}

  // 触发事件
  emit(eventName) {
		// 把 this.cache[eventName] 数组里面的 fn 依次调用
		(this.cache[eventName] || []).forEach(fn => fn())
	}
}

export default EventHub;
