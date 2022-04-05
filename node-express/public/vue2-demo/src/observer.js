// observer.js
import Dep from './dep.js'

// 转成对象响应式
export default class Observer {
  constructor(data) {
    // 数据类型必须是对象
    if (!Array.isArray(data)) {
      this.walk(data) // 将非数组对象转成响应式
    }
  }

  // 对象响应式处理
  walk(data) {
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }

  // TODO: 数据响应式处理
}

function defineReactive(data, key, val) {
  // 嵌套对象递归处理
  if (typeof val === 'object') {
    new Observer(val)
  }
  // 每个响应式对象的属性都对应着一个 dep 用于更新表达式依赖
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 当属性被访问时，就说明有表达式依赖此属性
      dep.depend()
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        // 更新值
        val = newVal
        // 当属性被设置，就通知该属性下管理的依赖更新
        dep.notify()
      }
    }
  })
}