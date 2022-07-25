### 门户后台管理平台

#### antd pro组件中注意

##### table组件

table组件中每一列每一行都需设置唯一的key值

在操作栏中渲染多个自己定义的组件，最好在最外层设置一个盒子统一设置一个key，方便统一管理

actionRender自定义操作栏中

~~~jsx

render: (text,record,_,action) => [
  <a
    key='editable'
    onclick={() => {
      action?.startEditable?.(record.id)
    }}
    >
    编辑
  </a>
]



// antd pro
// render 生成复杂数据的渲染函数
// text dom节点
// record 表示当前行的数据
// _ 表示行的index
// action 一些操作方法

// antd 
// text 根据dataindex取值 表示当前行的值
// record 表示当前行的数据
// index 表示行的index
~~~

![image-20220723151851623](/Users/swj/Library/Application Support/typora-user-images/image-20220723151851623.png)

##### input组件

受控组件： 

一：通过js来控制

二：通过原生 required来控制（常用）

#### 基本逻辑

在渲染时，尽可能少请求接口

### 封装组件

找出要封装组件的共性

提取公共部分如（结构）

若将某些方法封装在组件中，当方法需要改变时，复用性就不高，失去原本封装的意义

方法可以在组件通过绑定事件，处理不同的事

### remotion库

### vue

### 编程中一些快捷键

查找文件 ctrl + p

复制当前行 shift + alt + up

全局替换 ctrl + shift + h

光标快速移动 ctrl + 左右建

### vuex

##### State

使用单一状态树、每个应用只包含一个store实例

~~~js
const Counter = {
  template: `<div>{{count}}</div>`,
	computed: {
		count () {
			return this.$store.state.count 
		},
	},
}
// 从store实例中读取状态 在计算属性中返回某个状态

// 根组件
const app = new Vue ({
  el: '#app',
  // 把store实例注入所有的子组件
  store,
  components: {Count},
  template: `
  	<div>
  		<count></count>
  	</div>
  `
})
~~~

~~~js
// 一个组件需要获取多个store值 可以使用mapState辅助函数
import {mapState} from 'vuex'

export default {
  computed: mapState({
    // 两种方法
    count: state => state.count,
    countAlias: 'count'
    // 为了能够使用this获取局部状态只能使用常规函数
    countPlus(state) {
  		return state.count + this.localCount
		}
  })
}

// 若计算属性的名称和state子节点名称相同，可以给mapState传入一个字符串数组
computed: mapState([
  'count'
])

// 使用展开运算符，将mapState与局部的计算属性混合使用
computed : {
  localComputed: {},
    ...mapState({})
}
~~~

##### getters

Getters 的返回值会根据它的依赖缓存起来，只有依赖发生改变才会被重新计算

~~~js
const store = new Vuex.Store({
  state: {
    todos: [
      {id: 1,done: true},
      {id: 2,done: true}
    ]
  },
  // getters 接受state作为第一个参数
  getters: {
    doneTodos: state => {
      return state.todos.filter(item => item.done)
    }
  }
})
~~~

~~~js
// 访问getters
store.getters.doneTodos

// getters接受其他的getters作为第二个参数
getters: {
  doneTodos: state => {
      return state.todos.filter(item => item.done)
    },
   doneTodosLength: (state,getter) => {
     return getter.doneTodos.length
   }
}
~~~

~~~js
// mapState仅仅将store中getter映射到局部计算属性
computed: {
  ...mapState([
    'doneTodos',
    // 可将getter改名
    doneTodosLength: 'doneTodoscount'
  ])
}

~~~

##### Mutation

~~~js
// 更改vuex中store中状态的唯一方法就是提交mutation
// 每个mutation都有一个字符串的事件类型type和一个回调函数（进行状态更改的地方）
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutation: {
    // 回调函数接受state作为第一个参数
    increment(state) {
      state.count++
    }
  }
})

// 更改store中的值
store.commit('increment')
~~~

~~~js
// 提交payload,一般情况为对象
// 向store.commit传入额外的参数
mutation:{
  increment(state,payload) {
    state.count += payload.amount
  }
}
store.commit('increment',{
  amount: 10
})
// 对象风格的提交方式
store.commit: {
  type: 'increment',
  amount: 10
}
~~~

###### Mutation需要遵守的响应规则

1. 提前在store中初始化所有属性
2. 在对象中添加新的属性
3. Mutation必须同步函数

~~~js
Vue.set(obj,'newProp',123)
// 或者
state.obj = {...state.obj,newProp:123}
~~~

使用常量代替mutation事件

~~~js
// store.js
import Vuex from 'vuex'
import {SOME_MUTATION} from './mutation-types'

const store = new Vuex.Store({
  state: {},
  mutation: {
    [SOME_MUTATION](state) {}
  }
})


// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
~~~

###### 在组件中提交mutation

~~~js
this.$store.commit('xxx')

// 使用mapState (需要在根结点注入store)
import {mapState} from 'Vuex'
export default {
  methods: {
    ...mapState([
      'increment'
    ]),
   ...mapState({
     add: 'increment'
   })
  }
}
~~~









