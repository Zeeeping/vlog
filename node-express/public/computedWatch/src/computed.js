import Watcher from './watcher.js'

export function computed(getter) {
  let def = {}
  const computedWatcher = new Watcher(getter, { computed: true })
  Object.defineProperty(def, 'value', {
    get: () => {
      console.log('此时触发计算属性的 get hook 调用 computedWatcher.depend')
      computedWatcher.depend()
      console.log('收集了依赖之后，调用 computedWatcher.get')
      return computedWatcher.get()
    }
  })

  return def
}