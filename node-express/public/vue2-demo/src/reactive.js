// reactive.js
import { getDep } from './dep.js'

function isObject(val) {
  return typeof val === 'object' && val !== null
}

const validator = {
  get(...rest) {
    const dep = getDep(...rest)
    const res = Reflect.get(...rest)
    if (isObject(res)) {
      return new Proxy(res, validator)
    } else {
      dep.depend()
      return res
    }
  },
  set(target, key, value) {
    const dep = getDep(target, key)
    const res = Reflect.set(target, key, value)
    dep.notify()
    return res
  }
}

export function reactive(data) {
  return new Proxy(data, validator)
}