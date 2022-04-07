// watcher 栈
const targetStack = []

export default class Dep {
  constructor() {
    this.deps = new Set()
  }

  depend() {
    console.log('收集 Dep.target：', Dep.target)
    if (Dep.target) this.deps.add(Dep.target)
  }

  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}

Dep.target = null

// 将当前的 watcher 推入栈中，更新 Dep.target 为传入新的 _target
export function pushStack(_target) {
  if (Dep.target) {
    console.log('已经有一个 Dep.target：', Dep.target)
    console.log('将 Dep.target 推到 targetStack 栈中')
    targetStack.push(Dep.target)
  }
  console.log('将 _target', _target, '赋值给 Dep.target')
  Dep.target = _target
}

// 取上一个 watcher 作为 Dep.target，并将上一个 watcher 在栈中弹出
export function popStack() {
  Dep.target = targetStack.pop()
}