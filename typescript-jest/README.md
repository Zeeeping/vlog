# 搭建测试用例环境

先添加项目描述文件 `README.md` 和 项目忽略文件 `.gitignore`

本项目使用 `yarn` 包管理工具

项目任务清单：

- [x] 搭建 typescript 环境
- [x] 搭建 jest 环境
- [x] 编写第一个测试用例代码

##### 项目初始化

```json
yarn init -y
```

此命令也会生成一个 `package.json` 文件

##### typescript 环境搭建

```json
yarn add typescript --dev // -D 开发环境依赖 -S 运行环境依赖
npx tsc --init // 生成 tsconfig.json，用来配置我们的 ts 环境
```

我们需要把 `tsconfig.json` 文件做一些修改

```json
"types": ["jest"], // 用来支持 jest 类型
"noImplicitAny": false, // 关闭 ts 的 any 校验
```

##### jest 环境搭建

```json
yarn add --dev jest @types/jest // 添加 jest 源码和其 ts 类型
yarn add --dev babel-jest @babel/core @babel/preset-env // 添加 babel 相关，为了使原本只支持 CommonJs 的 jest 可以使用 ESModule import 导入代码
yarn add --dev @babel/preset-typescript // babel 和 ts 依赖
```

更多配置项请查阅 [jest 官网](https://jestjs.io/)

##### babel 配置

新建 `babel.config.js` 文件

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
}
```

##### package.json 配置

在 `package.json` 中新增启动命令

```
"scripts": {
  "test": "jest"
}
```

