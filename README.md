# 大前端 vlog

此分支为 `master` 分支，主要负责记录各个文件夹下的分支情况，每个分支流都有相应的依赖以及各自的分支流，分支流的大纲将在此分支下更新

## 构建 node 服务器

对应的文件夹是 `node-express`，主要使用 `express` 搭建简易的 `node ` 服务器应用，并配合 `node` 中间件实现静态文件部署

> ### vue2 响应式数据
>
> 对应的文件夹是 `public/vue2-demo`，基于 `vue2` 源码重构的简化版 `vue1.0`，主要实现数据响应挟持功能，使 `view` 视图能动态响应 `data` 数据

## 构建 typescript 环境

对应的文件夹是 `typescript-jest`，搭建 `typescript` 开发环境以及 `jest` 测试用例环境

## 前端开发规范

对应的文件夹是 `front-specification`，一套规范对于一个团队是很重要的

## react spa

对应的文件夹是 `vite-react-ts`，使用的技术栈是 `vite + react + ts`

## vscode

常用 vscode 用户配置

```
{
  "files.associations": {
  "*.vue": "vue",
  "*.wpy": "vue",
  "*.wxml": "html",
  "*.wxss": "css"
  },
  "terminal.integrated.shell.windows": "C:\Windows\System32\cmd.exe",
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.showExpandedAbbreviation": "always",
  "emmet.includeLanguages": {
  "vue-html": "html",
  "vue": "html",
  "wpy": "html"
  },
  //主题颜色 
  //"workbench.colorTheme": "Monokai",
  "git.confirmSync": false,
  "explorer.confirmDelete": false,
  "editor.fontSize": 14,
  "window.zoomLevel": 1,
  "editor.wordWrap": "on",
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  //失去焦点后自动保存
  "files.autoSave": "onFocusChange",
  // #值设置为true时，每次保存的时候自动格式化；
  "editor.formatOnSave": false,
   //每120行就显示一条线
  "editor.rulers": [
  ],
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
      "**/node_modules": true,
      "**/bower_components": true,
      "**/target": true,
      "**/logs": true,
  }, 
  // 这些文件将不会显示在工作空间中
  "files.exclude": {
      "**/.git": true,
      "**/.svn": true,
      "**/.hg": true,
      "**/CVS": true,
      "**/.DS_Store": true,
      "**/*.js": {
          "when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
      },
      "**/node_modules": true
  }, 
  // #让vue中的js按"prettier"格式进行格式化
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
          // #vue组件中html代码格式化样式
          "wrap_attributes": "force-aligned", //也可以设置为“auto”，效果会不一样
          "wrap_line_length": 200,
          "end_with_newline": false,
          "semi": false,
          "singleQuote": true
      },
      "prettier": {
          "semi": false,
          "singleQuote": true
      }
  }
}
```
