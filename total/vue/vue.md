









### 第一个vue程序

~~~js
<div id='app'>{{message}}</div>
const vm = new Vue({
  el: 'app',
  data: {
    message: 'hello'
  },
})
// 声明一个vue实例,作为根组件，此时data声明为一个对象（不会复用，改变数据不会影响到其他）
~~~

### 组件

~~~js
// 使用Vue.component('',{})创建一个组件
        Vue.component('to-do-item',{
            props: {
                title:String,
                del: {
                    type: Boolean,
                    default: false,
                }
            },
            template: `
            <li>
                <p v-if='!del'>{{title}}</p>
                <p v-else style:'text-decoration: line-through'>{{title}}</p>
                <button>删除</button>
            </li>
            `,
            data: () => {
                return {}
            },
            methods: {},
        })

// 此时data声明应该是一个函数，组件会被复用，在一个地方修改不会影响到其他地方
~~~

### 绑定事件

~~~js
// 在原生元素上绑定事件
        Vue.component('to-do-item',{
            props: {
                title:String,
                del: {
                    type: Boolean,
                    default: false,
                }
            },
            template: `
                <li>
                    <p v-if='!del'>{{title}}</p>
                    <p v-else style='text-decoration: line-through'>{{title}}</p>
                    <button @click='handleClick'>删除</button>
                </li>
            `,
            data: () => {
                return {}
            },
            methods: {
                handleClick(event){
                  	console.log(event)
                    console.log('1111');
                    this.$emit('delete',this.title)
                },
            },
        })
// 原生dom中event参数，表示触发事件的元素
// 在组件上绑定事件
        Vue.component('to-do-list',{
            template: `
                <ul>
                    <to-do-item v-for='item in list' :title='item.title' :del='item.del'  />
                </ul>
            `,
            data: () => {
                return {
                    list: [
                    {
                        title: '课程1',
                        del: true,
                    },
                    {
                        title: '课程2',
                        del: false,
                    },
                    ],
                }
            },
            methods: {
                handleDelete(val) {
                    console.log(val,'222');
                }
            }
        })
// 自定义事件 在自组件内部用this.$emit('自定义事件'，传出的参数)
~~~

### slot

#### 默认插槽

~~~js
// 将上面例子中to-do-item提取到外层
// 在to-do-list组件中需要用默认插槽，否则自组件渲染不出来
Vue.component('to-do-list',{
            template: `
                <ul>
                    <slot></slot>
                </ul>
            `,
            data: () => {
                return {
                    list: [
                    {
                        title: '课程1',
                        del: true,
                    },
                    {
                        title: '课程2',
                        del: false,
                    },
                    ],
                }
            },
        })
~~~

#### 具名插槽

~~~js
// 在to-do-item组件中前面加上icon后面同样也加上icon

Vue.component('to-do-item',{
            props: {
                title:String,
                del: {
                    type: Boolean,
                    default: false,
                }
            },
            template: `
                <li>
                    <slot name='preIcon'></slot>
                    <p v-if='!del'>{{title}}</p>
                    <p v-else style='text-decoration: line-through'>{{title}}</p>
                    <slot name='sufIcon'></slot>
                    <button @click='handleClick'>删除</button>

                </li>
            `,
            data: () => {
                return {}
            },
            methods: {
                handleClick(){
                    console.log('1111');
                    this.$emit('delete',this.title)
                },
            },
        })

						<to-do-item v-for='item in list' :title='item.title' :del='item.del' >
              // 2.6后的写法
              // 应使用短横线不应使用驼峰法
              	<template v-slot='pre-icon'>
                  <span>前置图标</span>
                </template>
                // 2.5之前的写法
                <span slot="sufIcon">后置图标</span>
            </to-do-item>
~~~

#### 作用域插槽

本质上：传递一个组件的函数

~~~js
Vue.component('to-do-item',{
            props: {
                title:String,
                del: {
                    type: Boolean,
                    default: false,
                }
            },
            template: `
                <li>
                    <slot name='pre-icon' :value='value'></slot>
                    <p v-if='!del'>{{title}}</p>
                    <p v-else style='text-decoration: line-through'>{{title}}</p>
                    <slot name='suf-icon'></slot>
                    <button @click='handleClick'>删除</button>

                </li>
            `,
            data: () => {
                return {
                    value: Math.random(),
                }
            },
            methods: {
                handleClick(){
                    console.log('1111');
                    this.$emit('delete',this.title)
                },
            },
        })
    <to-do-item v-for='item in list' :title='item.title' :del='item.del' >
               <template v-slot:pre-icon="{value}">
                 // 作用域插槽返回值
                   <span>前置图标{{value}}</span>
               </template>
                <template v-slot:suf-icon>
                    <span >后置图标</span>
                </template>
            </to-do-item>

// 组件内部声明了值 在插槽内绑定属性且传值
// 在使用插槽处传递值
~~~





























### v指令

#### v-bind：绑定属性

~~~html
<div id='app'>
    <span v-bind:title='message'>
        动态绑定的信息
    </span>
</div>
~~~

~~~js
var app = new Vue({
    el:'#app',
    data:{
        message:'页面加载于' + new Date().toLocalString()
    }
})
~~~

此处将span的title属性与vue实例的message的property绑定在一起，当message值改变，span的tiltle属性值也会改变

#### v-if：显示与否

~~~html
<div id='app'>
    <p v-if='seen'>
        是否看到我
    </p>
</div>
~~~

~~~js
var app = new Vue({
    el:'#app',
    data:{
        seen：true
    }
})
~~~

v-if控制元素的显示 ，当v-if对应的值为true时，对应的元素显示，若为false，元素隐藏

通过dom是否渲染来控制

#### v-for：循环渲染

~~~html
<div id='app'>
   <ol>
       <li v-for='item in todos'>
           {{item.text}}
       </li>
    </ol>
</div>
~~~

~~~js
var app = new Vue({
    el:'#app',
	data: {
    	todos:[
        	{text:'js'},
        	{text:'vue'},
        	{text:'react'},
    	],
    }
})
~~~

可以绑定数组的数据来渲染一个项目的列表，通常（item，index） in  array来渲染

#### v-on：绑定事件

~~~html
<div id= 'app'>
    <p>
        {{message}}
    </p>
    <button v-on:click='reverseMessage'>
       	反转信息
    </button>
</div>
~~~

~~~js
var app = new Vue({
    el:'#app',
    data:{
        message:'hello'
    }
    methods: {
        reverseMessage:function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})
~~~

v-on指令添加一个事件监听器，定义一个方法，触发事件，调用方法

#### v-model 实现表单输入与应用状态之间双向绑定

~~~html
<div id='app'>
    <p>{{message}}</p>
    <input v-model='message' />
</div>
~~~

~~~js
var app = new Vue({
    el:'#app',
    data:{
        message:'hello'
    },
})
~~~

#### v-once 只执行一次

~~~html
<span v-once>{{message}}</span>
~~~

使用v-once后message值就不会改变



#### v-html 为了输出html

~~~html
<p>
    using mustaches:{{rawHtml}}
</p>
<p>
    using v-html directive: <span v-html='rawHtml'></span>
</p>
~~~

注意点：

（1）动态渲染html是不可取的，容易导致xss攻击。只能在可信的内容上使用v-html，永不用在用户提交的内容上。

（2）scoped的样式不会应用在v-html内部，若想v-html内容设置css，可以替换为css modules或者用一个额外的全局的style元素手动设置类似BEM的作用域策略。

#### 修饰符

~~~html
<form v-on:submit.prevent='onSubmit'>
    
</form>
~~~

.prevent修饰符触发事件调用event.preventDefault()

#### 缩写

v-bind

~~~html
<!--完整语法-->
<a v-bind:href='url'>xxx</a>

<!--缩写-->
<a :herf='url'>xxx</a>

<!--动态参数-->
<a :[key]='url'>xxx</a>
~~~



v-on

~~~html
<!--完整语法-->
<a v-on:click='doSomething' ></a>

<!--缩写-->
<a @click='doSomething'></a>

<!--动态参数-->
<a @[event]='doSomething'
~~~



### vue实例

当一个vue实例创建时，将data中所有的property加入到vue的响应式系统中。**只有实例被创建时就已经存在data中的property才是响应式。**解决此问题可以一开始设置一个property，其值可设为空或者不存在。



#### 生命周期

![lifecycle](C:\Users\viruser.v-desktop\Desktop\notes\images\lifecycle.png)

### 计算属性

例子：

~~~html
<div id='example'>
    <p>
        Original message : "{{message}}"
    </p>
    <p>
        Computed reversed message : "{{reverseMessage}}"
    </p>
</div>
~~~

~~~js
var vm = new Vue({
    el:'#example',
    data:{
        message: 'hello',
    },
    computed: {
        reverseMessage: function () {
            return this.message.split('').reverse().join('');
        },
    },
})
~~~

**computed中this指向vue实例**

这种也可以使用方法来实现

~~~html
<p>
        Method reversed message : "{{reverseMessage（）}}"
</p>
~~~

~~~js
methods：{
    reverseMessage：function（） {
        return this.message.split('').reverse().join('')
    }
}
~~~

#### 计算属性与方法对比

计算属性是基于它们的响应式依赖进行缓存 —— 只有相关响应式依赖发生改变，才会重新求值。若依赖没有改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数。

~~~js
computed :{
    now: function () {
        return Date.now()
    }
}
~~~

Date.now()不是响应式依赖，不会一直更新

#### 计算属性和侦听属性

~~~html
<div id='demo'>
    {{fullName}}
</div>
~~~

使用侦听属性

~~~js
var vm = new Vue({
    el: '#demo',
    data: {
        firstName:'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar',
    },
    watch: {
        firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
        },
    },
})
~~~

使用计算属性

~~~js
var vm = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
    },
    computed: {
        fullName: function () {
            return this.firstName + this.lastName
        },
    },
})
~~~

#### 计算属性的setter

计算属性默认只有getter，但也可以提供一个setter

~~~js
computed: {
    fullName: {
        get: function() {
            return this.firstName + this.lastName
        },
        set: function(newValue) {
            var name = newValue.split(' ');
            this.firstName = name[0];
            this.lastName = name[name.length - 1]
        }
	}
}
~~~

### 侦听器

数据变化时执行异步或开销较大的操作，使用侦听器是最有用的。









