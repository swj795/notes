## 性能优化

### RAIL模型

用RAIL模型来衡量性能

web应用程序生命周期的四个不同方面：

1、响应(response)

目标：100ms内响应输出，预算：50ms内响应输出

除了响应输出，可能还有其他事情

2、动画(animation)

技术上来讲，16ms生成一帧，浏览器渲染需要6ms，所以在10ms中生成一帧

3、空闲(idle)

对于初始页面加载，加载尽可能少的内容，使用空闲时间加载剩余的内容

4、加载(load)

首次加载在5s内或更短时间内，后续加载一般为2s

---

### 影响页面加载的因素

1、网络速度和延迟

2、硬件

3、缓存驱逐

4、L2和L3的差异

5、解析js

---

### 性能API

```js
const t1 = window.performance.now()
// perfomance.now() 返回一个时间戳
doSomething()
const t2 = window.performance.now()

// 这能计算出某个函数执行所花的时间
```

