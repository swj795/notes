# Webpack 入门

## 什么是 Webpack

工具

开发，一般每改一次代码，都需要重新刷新浏览器，webpack 热更新服务，自动项目的重启，让我们访问到最新的修改内容 =》 热更新
ES2021
ES6 ES7 ES8 ES9 webpack + babel ES5 => 编译
css scss => css => 编译
项目上线：一键压缩代码，图片处理，=》 压缩打包服务
。。。非常多的服务

> 推荐一个图片压缩工具：https://tinypng.com/

其它打包工具
rollup
grunt
parcel
vite

node 服务端开发
electron 桌面端
uniapp ios 安卓 小程序
flutter ios 安卓

## 模块

在 webpack 一切皆模块

图片
字体
css 文件
js 文件

- 代码转换，TypeScript ,TS => js,scss,less=>csss
- 文件优化：压缩 js,css,html,图片也可以进行压缩
- 代码分割：提取多个页面的公共代码
- 模块合并：
- 自动刷新
- 代码校验：lint 检查
  ...

工程化开发、自动化思想

让代码执行一系列复杂的流程。

## 搭建 webpack 环境

基于 nodejs 开发的模块化打包工具

现在还是要学习下 node

vue-cli
react-cli
一定要安装 node 环境

node 版本经常更新的，
最新的版本肯定是进行了一些优化，还有改进

## 学习 webpack

### 项目初始化

第一步要进行项目的初始化

`npm init`

然后每一步填写一些信息

`npm init -y`

### 安装 webpack

本地安装
npm install webpack webpack-cli --save-dev

全局安装
npm install webpack webpack-cli -g

--save-dev 代表安装到开发环境，也就是标明是在开发环境下使用的
-D
--save 生产环境
-g 全局安装 --global

npm uninstall webpack webpack-cli -g

调用本地安装的包

npx
npm install npx -g

npx webpack

npm 的源是国外的

nrm
npm install nrm -g

nrm use tabao
nrm test 测试各个源的访问速度

在查看一些库的用法的时候，就可以到 npmjs.com

./ 代表是当前目录
../ 返回上一级目录
../../ 返回两级目录

npx webpack ./index.js

## 开始 webpack 配置

```js
<script type='module'>import {list} from '../list.js'; list();</script>
```

npx webpack

webpack.config.js 默认配置文件

### 配置入口与出口

需要用到 path node 文件处理模块
reolve() 将提供的路径解析为一个绝对路径
join() 拼接一个绝对路径

window
unix
linux
mac

tem/demo1/index.js
tem\demo1\index.js

绝对路径： /Users/wanggenzhen/Desktop/webpack-pratice/index.js
相对路径： ./index.js
\_\_dirname 代表当前执行的这个文件的所在目录

https://juejin.cn/post/6844903861920989198

### 梳理下流程

npx webpack
找默认的配置文件 webpack.config.js
找到配置文件之后，按配置文件中的自定义配置去处理文件模块
最终处理完成

myconfig.js
npx webpack --config myConfig.js 可以进行指定配置文件

## loader & plugin & 常用配置

webpack 默认提供了对 js 模块文件的处理

对于其它模块并没有提供

### loader

使用 loader

第一步首先安装

npm install file-loader -D
--save-dev

第二步就是在配置中使用

loader 执行顺序，他是从下到上，也就是从右到左

#### 什么是 loader

文件预处理器
特定的处理方案

css => css-loader
less => less-loader
html => html-loader

#### 图片处理优化

减少请求数
icon 图标 一般做成雪碧图
可以转换为 base64 不会向服务器发起请求

小文件图片 小于 4kb,

对于大图不要进行处理

#### 样式文件

less-loader => css-loader => style-loader

自动添加兼容前缀

-webkit-
-mox-
-ms

input

::placeholder{
    color:red;
}

::-moz-placeholder{
    color:red;
}
::-ms-placeholder{
    color:red;
}

postcss-loader

### plugin

