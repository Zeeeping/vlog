import Dep, { pushStack, popStack } from './dep.js'

export default class Watcher {
  // 新增：options 选项，配置计算属性 api 处理
  constructor(getter, options = {}) {
    // watcher 实例化所需要的参数方法，其实就是依赖
    // 因为方法里面有依赖数据
    this.getter = getter
    // this.get() // 删除，改为分支处理

    // 新增：计算属性处理
    const { computed } = options
    this.computed = computed

    if (computed) {
      // 计算属性也需要管理自己的依赖，可以收集别的 watcher 作为自己的依赖
      this.dep = new Dep()
    } else {
      // 如果不需要计算属性依赖，则直接处理当前依赖
      this.get()
    }
  }

  // 管理嵌套依赖
  // watcher 运行路径是：开始 -> ParantWatcher -> SonWatcher -> ParantWatcher -> 结束
  // 就是一个先进后出堆栈线性表
  get() {
    // 管理当前的依赖栈为当前的 watcher 实例
    console.log('触发 watcher 实例的 get 方法，此时的 this.getter 是：', this.getter)
    console.log(`然后调用 pushStack(_target) 作用是：把当前的依赖 ${ this.getter } 的 watcher 赋值到 Dep.target 上`)
    pushStack(this)
    // 再触发 getter 读取依赖的值从而将 Dep.target 实例添加到依赖中
    console.log('再调用 this.getter：', this.getter, '触发响应式 get hook 函数')
    this.value = this.getter()
    // 将当前栈中 watcher 弹出
    popStack()
    return this.value
  }

  // 新增：计算属性实例需要手动收集依赖
  depend() {
    console.log('computedWatcher.depend')
    this.dep.depend()
  }

  update() {
    // 新增：计算属性更新操作
    console.log('update：', this)
    if (this.computed) {
      // this.get()
      console.log('update -> notify')
      this.dep.notify()
    } else {
      console.log('update -> get')
      this.get()
    }
    // 更新时，先触发响应式数据 set hook 更新值，然后通知 dep 依赖管理者调用 notify
    // 当前 dep 实例有 deps 依赖数组存着当前的 watchers
    // notify 会遍历 watchers，执行 update 操作，再执行 get 触发依赖函数完成依赖更新
    // this.get()
  }
}