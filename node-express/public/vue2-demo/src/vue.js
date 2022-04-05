// vue.js
// import Observer from './observer.js'
import Watcher from './watcher.js'
import { reactive } from './reactive.js'

export default class {
  constructor(ops) {
    const { el, data } = ops
    // 根元素
    this.$el = document.querySelector(el)
    // 响应式数据
    this.$data = data

    this.reactive(this.$data)
    this.compile(this.$el)
  }

  // 响应式处理
  reactive(data) {
    // 观察者模式
    // new Observer(data)
    // 代理者模式
    this.$data = reactive(data)
  }

  compile(node) {
    let { nodeType, childNodes } = node
    // 如果是元素节点
    if (nodeType === 1) childNodes.forEach(childNode => this.compile(childNode))
    // 如果是文本节点
    else if (nodeType === 3) {
      const reg = /{{(.+?)}}/g
      let match
      while (match = reg.exec(node.nodeValue)) {
        let [
          raw, // {{ name.first }}
          key //  name.first 
        ] = match
        window.target = new Watcher(this, key.trim(), raw, (newVal, oldVal) => {
          node.nodeValue = node.nodeValue.replace(oldVal, newVal)
        })
        window.target.update()
        window.target = null
      }
    }
  }

  parsePath(exp) {
    exp = exp.split('.')
    return exp.reduce((prev, next) => {
      return prev[next]
    }, this.$data)
  }
}
