# 安装运行

## 下载

```
git clone http://172.20.32.56:83/SitCloud/DIPFR

```

## 安装依赖包

```
npm install
//或 cnpm install(推荐)
cnpm install

```

## 运行

```
npm start
```

## 打包

```
npm run build

```

# 使用的技术

## react [https://reactjs.org/](https://reactjs.org/)

[官方文档](https://reactjs.org/docs/hello-world.html)  | [中文文档](http://www.css88.com/react/docs/react-api.html)

## ant-design [http://ant-design.gitee.io/index-cn](http://ant-design.gitee.io/index-cn)

[官方文档](http://ant-design.gitee.io/docs/react/introduce-cn)


## dva [https://github.com/dvajs/dva](https://github.com/dvajs/dva)

[github](https://github.com/dvajs/dva)

基于 [redux](https://github.com/reactjs/redux)、[redux-saga](https://github.com/redux-saga/redux-saga) 和 [react-router](https://github.com/ReactTraining/react-router) 的轻量级前端框架。(Inspired by [elm](http://elm-lang.org/) and [choo](https://github.com/yoshuawuyts/choo))

### 特性

* **易学易用**：仅有 6 个 api，对 redux 用户尤其友好
* **elm 概念**：通过 `reducers`, `effects` 和 `subscriptions` 组织 model
* **支持 mobile 和 react-native**：跨平台 ([react-native 例子](https://github.com/sorrycc/dva-example-react-native))
* **支持 HMR**：目前基于 [babel-plugin-dva-hmr](https://github.com/dvajs/babel-plugin-dva-hmr) 支持 components、routes 和 models 的 HMR
* **动态加载 Model 和路由**：按需加载加快访问速度 ([例子](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#dvadynamic))
* **插件机制**：比如 [dva-loading](https://github.com/dvajs/dva/tree/master/packages/dva-loading) 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
* **完善的语法分析库 [dva-ast](https://github.com/dvajs/dva-ast)**：[dva-cli](https://github.com/dvajs/dva-cli) 基于此实现了智能创建 model, router 等
* **支持 TypeScript**：通过 d.ts ([例子](https://github.com/sorrycc/dva-boilerplate-typescript))

### 为什么用 dva ?

* [Why dva and what's dva](https://github.com/dvajs/dva/issues/1)
* [支付宝前端应用架构的发展和选择](https://www.github.com/sorrycc/blog/issues/6)


以下能帮你更好地理解和使用 dva ：

* 理解 dva 的 [8 个概念](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md) ，以及他们是如何串起来的
* 掌握 dva 的[所有 API](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md)
* 查看 [dva 知识地图](https://github.com/dvajs/dva-knowledgemap) ，包含 ES6, React, dva 等所有基础知识
* 查看 [更多 FAQ](https://github.com/dvajs/dva/issues?q=is%3Aissue+is%3Aclosed+label%3Afaq)，看看别人通常会遇到什么问题
* 如果你基于 dva-cli 创建项目，最好了解他的 [配置方式](https://github.com/sorrycc/roadhog#配置)