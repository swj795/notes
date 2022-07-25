# Generator函数

如果内部没有yield就是单纯的暂缓执行函数，只有调用next才会执行

```js
function * helloWorldGenerator () {
  yield 'hello';
  yield 'world';
  return 'ending';
}
const hw = helloWorldGenerator ()
// 该函数有三个状态 hello world ending (yield和return状态

hw.next() // {value: 'hello',done: false}
hw.next() // {value: 'world',done: false}
hw.next() // {value: 'ending',done: true}
hw.next() // {value: undefined, done: true}
```



调用Generator函数，该函数并不执行，返回一个指向内部状态的指针对象，即遍历器对象，调用遍历器对象的next方法，使得指针移向下一个状态

next方法返回的对象  value属性就是当前yield表达式的值  done属性的值false 表示遍历还没结束

1、遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的表达式的值，作为返回对象的value属性值，

2、下一次调用next方法，再继续往下执行，直到遇到下一个yield表达式

3、如果没有新的yield，就一直运行到函数结束，直到return 

4、如果没有return 返回的对象的value属性值为undefined

yield表达式本身没有返回值，或者返回undefined，next方法可以带一个参数，当成上一个yield表达式的返回值。

![image-20220107105353531](/Users/swj/Library/Application Support/typora-user-images/image-20220107105353531.png)

