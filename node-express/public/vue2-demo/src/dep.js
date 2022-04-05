// dep.js

// 储存对象对应的 depsMap
const targetMap = new WeakMap()

export function getDep(target, key) {
  // 每个对象有对应的 deps map 管理里面每个属性的依赖
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}

export default class Dep {
  constructor() {
    // 每个响应式属性都需要 deps 管理表达式依赖
    this.deps = new Set()
  }

  depend() {
    // 暂时将依赖存在全局
    window.target && this.deps.add(window.target)
  }

  notify() {
    // 循环更新该属性的表达式依赖
    this.deps.forEach(watcher => watcher.update())
  }
}