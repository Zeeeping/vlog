import Dep, { pushStack, popStack } from './dep.js'

export default class Watcher {
  constructor(getter) {
    // watcher 实例化所需要的参数方法，其实就是依赖
    // 因为方法里面有依赖数据
    this.getter = getter
    this.get()
  }

  // 管理嵌套依赖
  // watcher 运行路径是：开始 -> ParantWatcher -> SonWatcher -> ParantWatcher -> 结束
  // 就是一个先进后出堆栈线性表
  get() {
    // 管理当前的依赖栈为当前的 watcher 实例
    pushStack(this)
    // 再触发 getter 读取依赖的值从而将 watcher 实例添加到依赖中
    this.getter()
    // 将当前栈中 watcher 弹出
    popStack()
  }

  update() {
    // 更新时，先触发 set 更新值，再执行 get 触发依赖函数完成依赖更新
    this.get()
  }
}