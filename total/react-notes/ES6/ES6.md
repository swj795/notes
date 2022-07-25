# ES6

## 函数的扩展

### 默认参数位置

如果在非尾部设置默认参数，那么传参时，此位置的参数不能省略

```js
function f(x=1,y){return [x,y]}
f(,2) // 报错
```



### 函数length属性

Function.length // 返回函数参数的长度

```js
// 若设置默认参数，那么Function.length将会失真 
function f(x,y,z=1){return [x,y,z]}
console.log(f.length)  // 2

// 如果设置默认参数不是尾参数，那么默认参数后面的参数也将不计入后面的参数
function f(x,y=2,z){return [x,y,z]}
function f1(x=1,y=2,z){return [x,y,z]}
console.log(f.length) // 1
console.log(f1.length) // 0
```

### 作用域

函数进行初始化时，参数会形成一个单独的作用域。不设置参数时，则不会出现

```js
let x = 2 
function f(x=x){
    console.log(x)
}
// 由于TDZ会导致报错
// 编译时，let x = x 出现TDZ

// 默认参数是函数也会有作用域
function bar(funtion = ()=> foo){
    let foo = 'inner';
    console.log(foo)
}
bar() // 报错

let foo = 'outer'
function bar(funtion = ()=> foo){
    let foo = 'inner';
    console.log(foo)
}
bar() // outer


// 复杂例子
var x = 1;
function foo(x,y = function(){ x = 2; console.log(x)}){
    var x = 3;
    y();
    console.log(x)
}

foo() 
console.log(x)

// 2 3 1
// 函数初始化时，参数x和y有自己的作用域 foo函数内部定义的x变量 与 参数x 不是同一个变量

var x = 1;
function foo(x,y = function(){ x = 2; console.log(x)}){
    x = 3;
    y();
    console.log(x)
}

foo() 
console.log(x)

// 2 2 1
// 此时 foo函数内部的x变量 与 参数x 为同一变量 y() 运行后会改变x
```



### 箭头函数不适用的场景

1、定义对象的方法，且该方法中包括this

2、需要动态的this的时候

```js
var button = document.querySelector('press')
button.addEventListener('click',()=>{
    this.classList.toggle('on');
})
```

3、函数内部有大量的读写操作，不单为了计算值 ，不应该使用箭头函数



### Function.prototype.toString()

函数实例调用toString()方法，返回函数实例本身

## 数组的扩展

### 复制数组

```js
// 直接复制 只是复制了指针  属于浅拷贝 修改复制后的数组，原数组也会改变
const a1 = [1,2]
const a2 = a1;
a2[0] = 2;
console.log(a1) // [2,2]

// 使用ES6的方法 就是深拷贝 修改复制后的数组 原数组不会改变
const a1 = [1,2]
const a2 = [...a1]  或 const [...a2] = a1
a2[0] = 2
console.log(a1) // [1,2]
```

### 合并数组

```js
// 属于浅拷贝 
const a1 = [a,b]
const a2 = [c,d]
// ES5 
const a3 = a1.concat(a2)
// ES6
const a3 = [...a1,...a2]
```



### Array.from()

```js
// 将类数组对象和可遍历对象转换成真正的数组
let arrayLike = {
    '0':'a',
    '1':'b',
    '2':'c',
    length:3
};
// ES5  
// slice 属于浅拷贝 原始数组不会改变
var arr = [].slice.call(arrayLike); // ['a']

// ES6
let arr2 = Array.from(arrayLike)

// 对于没有Array.from的浏览器
const toArray = (()=>Array.from ? Array.from : obj => [].splice().call(obj))()

// 接收第二个参数 作用类似数组的map方法
// Array.prototype.map() 返回一个新数组，数组元素是调用提供函数后的返回值

Array.from(arrayLike,n => n||0)

// expr1 || expr2  如果expr1为true  返回expr1 反之返回expr2 用与Boolean中 有一个为true返回true
// expr1 && expr2  如果expr1为false 返回expr1 反之返回expr2 用与Boolean中 有一个不为true返回false
```

## 对象的扩展

```js
Object.getOwnpropertyDescriptor(obj,prop)
// 返回对象上一个自由属性对应的属性描述符 如果查找不到这个属性返回undefined

// 函数的name属性 返回函数名
// 对象的方法也是函数，因此也有name属性
const person {
    sayName(){
        console.log('hi')
    }
}

console.log(person.sayName.name) // sayName

// 如果对象的方法中使用了getter或者setter 则name属性不在该方法上面,而是在该方法的属性描述对象的get和set属性上
const obj = {
    get foo(){},
    set foo(x){}
}
obj.foo.name // TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj,'foo')

descriptor.get.name // 'get foo'
descriptor.set.name // 'set foo'

// 两种特殊情况
// 1、bind方法创造的函数  返回 bound + 原函数名
// 2、Function构造函数创造的函数 返回 anonymous

// 如果对象的方法是Symbol值，那么name属性返回的这个Symbol值的描述
const key1 = Symbol('description')
const key2 = Symbol()

const obj = {
    [key1](){},
    [key2](){}
};
obj[key1].name // '[description]'
obj[key2].name // ''
```

### 属性的遍历

1、for...in

循环遍历对象自身的和继承可枚举属性（不包含Symbol属性）

2、Object.keys(obj)

返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

3、Object.getOwnpropertyName(obj)

返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

4、Obejct.getOwnpropertySymbol(obj)

返回一个数组，包含对象自身的所有 Symbol 属性的键名。

5、Reflect.ownKeys(obj)

返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

### super关键字

指向当前对象的原型对象，只能用在对象的方法之中

```js
const proto = {
    foo: 'hello'
}

const obj = {
    foo: 'world',
    find(){
        return super.foo
    }
}

Object.setPrototypeOf(obj,proto)
obj.find() // hello

Object.setPrototypeOf(obj,prototype)
// obj 要设置其原型的对象  prototype 该对象的新原型
```



### 扩展运算符

```js
// 对象的扩展运算符(...)用于取出参数对象的可遍历属性，拷贝到当前对象之中
let z = {a:3,b:4}
let n = {...z}

// 如果扩展运算符后面是一个空对象，则没有任何效果
{...{},a:1} // {}
// 如果扩展运算符后面不是对象，则会自动转为对象
{...1} //{}

// 可以合并两个对象
let c = {...a,...b}
let c = Object.assign({},a,b)
```

## 运算符的扩展

```js
// 指数运算符 **
2 ** 3 // 8
2 ** 3 ** 2 // 512 
// 先计算第二个指数运算符

**=
let a = 4
a **= 3 // a = a * a * a
```



### 链判断运算符

```js
obj?.prop // 对象属性是否存在
obj?.[expr] // 对象属性是否存在
func?.(...args) // 函数或对象方法是否存在

// 三目运算符中
const lastName = message?.body?.user?.firstName || 'default'
// message 是否存在 body是否存在 user是否存在 firstName是否存在
```



## Set

```js
// 类似数组 但是成员的值都是唯一

// 用Set做数组去重
// 一种
const s = new Set();
const arr = [2,2,3,4,4]
arr.forEach(x=>s.add(x))
const arr1 = Array.from(s)
console.log(arr1)

function dedupe(array){
    return Array.from(new Set(array))
}
// 第二种
const arr = [...new Set(array)]
```



## map

```js
// Map转为数组
const myMap = new map()
myMap.set(true,7)
myMap.set({foo:3},['abc'])
[...myMap] // [[true,7],[{foo:3},['abc']]]

// 数组转成map  将数组传入Map构造函数中，就可以转为Map
new Map([[true,7],[{foo:3},['abc']]])

// Map转为对象 所有的Map的键都是字符串，他可以无损转为对象
function strMapToObj(strMap){
    let obj = Object.create(null);
    for(let [k,v] of strMap){
        obj[k] = v
    }
    return obj;
}

// 对象转为Map
let obj = {'a':1,'b':2}
let map = new Map(Object.entries(obj))

function objToStrMap(obj){
    let strMap = new Map()
    for (let k of Object.keys(obj)){
        strMap.set(k,obj[k])
    }
    return strMap
}

objToStrMap({yes:true,no:false})

// Map转为JSON
function strMapToJSon (map) {
    return JSON.stringify(strMapToObj(map))
}


```



## proxy

用于修改某些操作的默认行为，对编程语言进行编程

```js
const p = new Proxy(target,handler)
// target要使用proxy包装的目标对象  handler 以函数作为属性的对象 各属性中的函数分别定义在执行各种操作代理p的行为

```



## promise

```
// 用promise对象实现Ajax

const getJSON = function(url){
	const promise = new Promise((resolve,reject)=>{
	
	})
}
```



## 模块化

1、导入模块默认输出的名字可以任意命名（export default xxx1）(import xxx2 from 'xxx')

2、导入的变量都当成只读，不要轻易改变它的属性

使用export default 对应import不需要使用大括号 若没有使用export default 对应的import需要使用大括号

