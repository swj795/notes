### 作用域

#### 变量赋值的编译过程

1、遇到var a ，编译器首先查询当前作用域是否存在a这个变量；

**若存在，编译器会忽略该声明，继续编译**

若不存在，在当前作用域中声明一个变量，且命名为a

~~~js
var a = 2
~~~

2、引擎运行，首先询问作用域，当前作用域中是否存在一个名为a的变量；

若存在，则引擎使用该变量

若不存在，引擎会继续查找该变量，

若找到该变量，进行赋值操作，否则引擎会抛出一个异常。

tips：首先**编译器**会**在当前作用域中声明一个变量**（之前没有声明过），然后在运行时**引擎在作用域中查找该变量**，找到则对它进行赋值

#### 查询方式

LHS 和 RHS

当变量出现在赋值号左侧进行LHS，出现在右侧进行RHS。（不一定准确）

RHS：简单地查找某个变量的值。简单地理解：retrieve his source value （得到某个值）

LHS：试图找到变量的容器，从而可以对其进行赋值

~~~js
console.log(a) // 对于a的引用 RHS引用

a = 2 // 对于a的引用 LHS
~~~

自我理解： 

对于变量来讲，我只需查询到该变量的值，不需进行赋值操作则为RHS。而需要对变量进行赋值操作，那么则是LHS

~~~js
function foo(a) {
  console.log(a)
}

foo(2) 

// 对于foo(..)需要对foo进行RHS，（foo函数可简单认为是一个变量）找到foo的值，并值告诉我

// 对于参数传递，隐式赋值a = 2 对于变量a是LHS 
// 在console.log中对于a 引用RHS
// 对于console.log也是RHS
~~~

~~~js
// test
function foo(a) {
  var b = a
  return a + b
}

var c = foo(2)

// 对于c变量LHS
// 隐式传递对于a LHS
// 对于 var b 中b变量 LHS

// foo（2）进行RHS
// 对于var b = a中a来讲LHS
// return a + b 分别进行RHS
~~~

#### 欺骗词法作用域

##### eval

~~~js
eval(str) // 参数为字符串
// 用eval会运行字符串中的内容
~~~

~~~js
function foo(str,a){
  eval(str)
  console.log(a,b)
}

var b = 2
foo('var b = 3',1) // 1, 3

// eval() 在内部执行了var b = 3
// 此时函数内部有个b变量，屏蔽了全局的b变量
~~~

在严格模式下，eval有自己的作用域

##### with关键字

~~~js
function foo(obj) {
  with(obj) {
		a = 2 
  }
}

var o1 = {
	a = 3
}

var o2 = {
	b = 3
}

foo(o1)
console.log(o1.a)// 3
// with修改了o1对象的a属性

foo(o2)
console.log(o2.a)// undefined
console.log(a)// 3
// with由于在对象o2中没有找到a 属性 不会创造属性，但是在全局中创建一个变量a
~~~





### 错误类型

RHS查询变量没有找到抛出异常 ReferenceError

在严格模式下，LHS查询失败 抛出异常 ReferenceError

RHS查询到变量，对变量进行不合理的操作 抛出异常 TypeError  



















