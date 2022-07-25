### TS配置文件

```bash
// 创建ts配置文件
tsc --init
// 对配置项进行检测
tsc -w
// 执行此命令会讲ts文件自动生成js文件
```

## 基本类型

### 布尔值

~~~tsx
let isDone: boolean = false
~~~

### 数字

~~~tsx
let decLiteral: number = 6
let hexLiteral: number = 0xf00d // 十六进制
let binLiteral: number = 0b1010 // 二进制
let octalLiteral: number = 0o744 // 八进制
~~~

### 字符串

~~~tsx
let name: string = 'swj'
// 字符串模版
let age: number = 24
let sentence: string = `${name} is ${age}`
~~~

### 数组类型

```tsx
// 第一种方式 使用数组
const arr :number[] = [1,2,3]

// 第二种方式 使用数组泛型
const arr Array<number> = [1,2,3]

// 元组 规定了数组中元素数量以及类型的数组
const tuple :[number,string,boolean] = [1,'s',true]
```

### type alias

~~~tsx
// 类型别名
type point = {
    x: number,
    y: number
}

function printCoord(pt: point) {
    console.log(pt)
}

printCoord({x:10,y:10})

// 可以给任何数据类型取别名
~~~

### union 

~~~tsx
// 声明一个联合类型
type Id = number | string
function printId(id: Id) {
    console.log(id)
    console.log(id.toUpperCase()) // error
}
// id可能是number也可能是string
// 对于联合类型进行操作，那么此方法需要适用于联合类型的每一个类型
~~~

### 枚举

```tsx
// enum 枚举 默认从0开始编号 也可手动编号 声明形式与class相同
enum Color {red, green, pink}
console.log(Color[0]) // red

enum Color {red=1,green}
console.log(Color[0]) // undefined
console.log(Color[1]) // red
```

### Void And Any

```tsx
// any 任何类型
// void 表示没有任何类型 常用在函数没有返回值时
function read():void {
  console.log('read');
}
// 如果是变量的话 只能赋值undefined或者null
```

### Null和undefined

~~~tsx
let u: undefined = undefined;
let n: null = null;
~~~

### Never 

```tsx
// never 表示那些不存在的值的类型 
function Error ():never {
  throw new Error('失败了')
}
// never类型是那些总是会抛出异常 或者根本就不会有返回值的函数表达式 或箭头函数表达式的返回值类型
```

### 对象

```tsx
let obj:{name:string,age:number,lastName?:string} = {name: 's',age: 18}
// 设置对象有name和age属性 并且属性都设置了类型
// 少设置一个就会报错 可以设置可选属性
```

#### 属性重命名

~~~tsx
let {a: newName1,b: newName2} = o
// 等价于
let newName1 = o.a
let newName2 = o.b

// 若想指定类型
let {a,b}:{a: string,b: number} = o
~~~



### 类型断言

~~~tsx
// '尖括号语法'
let someValue: any = 'this is a string'
// 断言someValue是一个字符串
let stringLength: number = (<string>someValue).length;
~~~

~~~tsx
// as语法
let someValue: any = 'this is a string'
// as用法
let stringLength: number = (someValue as string).length;
~~~

### 函数声明

~~~tsx
type c ={a: string, b?: number}
function f({a,b} : c): void {
  ...
}
  // 传入两个参数 从对象中结构出来
~~~

### unkonw

```tsx
// 用于表示未知类型
// 作为类型断言转换成其他类型的中转站
const str :string = '99';
const num :number = str as unknown as number
```

![image-20220117115056378](/Users/swj/Library/Application Support/typora-user-images/image-20220117115056378.png)

### 类型断言

```tsx
// as语法
const someValue : any = 'some'
const length : number = (someValue as string).length

// <>
const someValue :any = 'some'
const length : number = (<number>)
```

### 展开操作符

~~~tsx
// 展开数组
let first = [1,2]
let second = [3,4]
let bothPuls = [0, ...first, ...second,5] // [0,1,2,3,4,5] 

// 展开对象
let o = {
  food: 'spicy',
  price: '$',
	ambiance: 'noisy'  
}

let search = {...o,food:'rich'} // {food:'rich',price:'$',ambiance:'noisy'}
// 展开对象后面属性会覆盖前面的属性
~~~

## 接口（interface）

~~~tsx
function printLabel (labelledObj: { label: string}){
  console.log(labelledObj.label)
}

// 使用接口
interface labelledValue {
  label: string
}
// 必须包含一个label属性且类型为string

function printLabel(labelledObj: labelledValue) {
  console.log(labelledObj.label)
}
// 传入的对象必须包含一个label属性且类型为string

let obj = {size: 10,label: 'ssss'}
printLabel(obj)
~~~

### type与interface区别

~~~tsx
// 拓展属性
// interface 继承接口
interface Animal {
    name: string
}
interface Bear extends Animal {
    age: number
}

// type通过&来拓展属性
type Animal = {
    name: string
}

type Bear =Animal & {
    age: number
}

// 这两种方法都能实现bear实例下拥有name和age属性


// 在一个存在的接口中添加新的东西
interface Window {
    title: string
}

interface Window {
    ts: TypescriptApi
}

// type创建后就不能改变
type Window = {
    title: string
}

type Window = {
    ts: TypescriptApi
}// error
~~~

### 可选属性

~~~tsx
// 接口中的属性不是必须的
interface SquareConfig {
  color?: string,
  width?: number
}

// 传入一个对象（对象可能存在接口中的属性） 函数返回一个对象包含两个属性
function creatSquare(confing: squareConfig) : {color: string,area: number} {
  let newSquare = {color: 'white', area: 100}
  if(config.color) {
    newSquare.color = config.color
  } 
  if(config.width) {
    newSquare.width = config.width
  }
  return newSquare
}
let mySquare = creatSquare({color: 'black'})

// 优点一：对于可能存在的属性进行预定义
// 优点二：可以捕获引用了不存在的属性

function creatSquare(confing: squareConfig) : {color: string,area: number} {
  let newSquare = {color: 'white', area: 100}
  if(config.color) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.colo
  } 
  if(config.width) {
    newSquare.width = config.width
  }
  return newSquare
}
~~~

### 只读属性

~~~tsx
// 对象属性只能在对象刚刚创建的时候修改其值
interface point {
  readonly x: number,
  readonly y: number
}

let pl: point = {x: 10, y: 20}
// 此时x y不能改变
pl.x = 5 // error

// ReadonlyArray<T> 把所有可变的方法去掉
let a: number[] = [1,2,3,4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 //error
ro.push(5) // error
ro.length = 100 // error
a = ro // error
// 将整个只读数组赋值给一个普通数组也是不允许的

// 但是可以用类型断言重写
a = ro as number[]
~~~

### Readonly 与const

变量使用const 属性使用 readonly

### 额外的属性检查

~~~tsx
// 接口中的属性不是必须的
interface SquareConfig {
  color?: string,
  width?: number
}

// 传入一个对象（对象可能存在接口中的属性） 函数返回一个对象包含两个属性
function creatSquare(confing: SquareConfig) : {color: string,area: number} {
  let newSquare = {color: 'white', area: 100}
  if(config.color) {
    newSquare.color = config.color
  } 
  if(config.width) {
    newSquare.width = config.width
  }
  return newSquare
}

let mySquare = creatSquare({colour: 'black'}) // error: 'colour' not expected in type 'SquareConfig'

// 绕开这些检查
// 方法1: 使用类型断言
let mySquare = creatSquare({width: 100,opacity: 0.5} as SquareConfig)

// 方法2:添加字符串索引（推荐）
interface SquareConfig {
  color?: string,
  width?: number,
  [propName: string]: any
}
// 有任意数量的属性 并且只要不是color和width 就无所谓

// 方法3 将这个对象赋值给另一个变量
let squareOptions = {colour: 'black'} 
let mySquare = creatSquare(squareOptions)
~~~

### 函数类型

~~~tsx
// 接口也可描述函数类型
// 只有参数列表和返回值类型的函数定义
interface SearchFunc {
  (source: string, subString: string): boolean
}
// 创建一个函数类型的变量、并将一个同类型的函数赋值给这个变量
let mySearch: SearchFunc
mySearch = function (source: string, subString: string): boolean {
  let res = source.search(subString)
  return res > -1
}
// 函数的参数名不需要与接口中定义的名相匹配
// 重写上面代码
mySearch = function (src: string, subS: string): boolean {
  let res = source.search(subString)
  return res > -1
}

// String.prototype.search()
str.search(regxp)
// 参数 如果传入一个非正则表达式对象 则隐式转成正则表达式对象
// 返回值 若匹配成功返回正则表达式中首次匹配项的索引 否则返回-1
~~~

### 可索引的类型

~~~tsx
interface StringArray {
  [index: number]: string
}

let myArr: StringArray
myArr = ['s','w']
let myStr: string = myArr[0]

。。。。
~~~

### 类类型

~~~tsx
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number){}
}

// 可在接口中描述一个方法
interface ClockInterface{
  currentTime: Date,
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number){}
}

// 接口描述了类的公共部分，而不是公共和私有两部分
~~~

### 类静态部分与实例部分

~~~tsx
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  // 实例部分
  currentTime: Date
  // 类的静态
  constructor(h: number, m: number){}
}

// 一个类实现一个接口 只对实例部分进行类型检查 不对类的静态部分检查

。。。。
~~~

### 继承接口

~~~tsx
// 从一个接口里复制成员到另一个接口中，可以更灵活将接口分割到可重用的模块中
interface Shape {
	color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = <Square>{}
square.color = 'black'
square.sideLength = 10 
~~~

~~~tsx
// 一个接口可以继承多个接口
interface Shape {
	color: string
}

interface PenStorke {
	penWidth: number
}

interface Square extends Shape, penStroke {
  sideLength: number
}

let square = <Square>{}
square.color = 'black'
square.sideLength = 10 
square.penWidth = 5    
~~~

### 混合类型

~~~tsx
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

// 函数返回值为Counter类型对象
function getCounter(): Counter {
  // counter是一个Counter类型的函数
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
~~~

### 接口继承类





## literal interence 字面推理

~~~tsx
// 初始对象 ts会假设对象的属性值会发生改变
cosnt obj = {count: 0}
 if(condition) {
    obj.count = 1
 }

// 对于string
const req = {url:'xxx',method:'GET'}
handleRequest(req.url,req.method)
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
// 这里推断method对应的是string类型而不是GET或者POST

// 方法一 将method断言成GET类型
const req = {url:'xxx',method: 'GET' as 'GET'}
// 方法二 将对象断言成一个常量
const req = {url: 'xxx',method:'GET'} as const
~~~























