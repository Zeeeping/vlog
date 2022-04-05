// watcher.js
export default class Watcher {
  constructor(vm, exp, value, cb) {
    // 初始化依赖
    this.vm = vm
    this.exp = exp
    this.value = value
    this.cb = cb
  }

  update() {
    // 先获取值
    const newVal = this.vm.parsePath(this.exp)
    const val = this.value
    if (newVal !== val) {
      this.cb?.(newVal, val)
      // 旧值应该更新成新值，不然 val 一直是初始值
      this.value = newVal
    }
  }
}