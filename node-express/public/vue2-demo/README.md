# vue2-demo

基于 `vue2` 源码重构的简化版 `vue1.0`，主要使用 `js` 原生 API  `Object.defineProperty` 进行数据挟持，改写对象的读取和修改的 `hook` 函数，从而实现监听数据的读取和修改，但由于存在各种缺陷

1. 对象：无法监听对象属性的添加和删除，需要使用 `vue` 提供的全局 `$set`，其本质也是给新增的属性手动 `observer` 转换成响应式数据
2. 数组：无法设置数组索引的添加，也是同对象一样手动 `observer` 转换成响应式数据

本项目将基于 `vue1.0` 使用`Proxy` 类重写响应式数据，替代 `Object.defineProperty` API