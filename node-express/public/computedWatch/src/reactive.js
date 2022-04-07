import Dep from './dep.js'

const isObject = data => typeof data === 'object' && data !== null

// 将对象定义为响应式数据
export function reactive(data) {
  if (isObject(data)) {
    // 遍历对象属性 key
    Object.keys(data).forEach(key => defineReactive(data, key))
  }
  // 返回处理后的对象
  return data
}

// 真正实现响应式数据的方法
function defineReactive(obj, key) {
  // 先拿到值避免在 get 中获取值触发 get
  let val = obj[key]
  if (isObject(val)) reactive(val)
  // 依赖管理者
  let dep = new Dep()

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      console.log('此时触发普通属性的 get hook 调用 dep.depend')
      dep.depend()
      return val
    },
    set: newVal => {
      if (newVal != val) {
        console.log('此时触发普通属性的 set hook 调用 dep.notify')
        val = newVal
        dep.notify()
      }
    }
  })
}