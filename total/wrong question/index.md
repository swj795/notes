```js
const person = {
    name: 'sss',
    age: 21,
}

let city = person.location
city = 'shanghai'
```

city是变量，一开始将person对象中的location属性值赋值给他，并不会改变person对象。改变对象应该：

![image-20211223100954368](/Users/swj/Library/Application Support/typora-user-images/image-20211223100954368.png)

---

错误类型：

---



```js
const person = {
  name: 'xxx',
  age: 11
}

const changeAge = (x={...person}) => x.age += 1;
const changAgeAndName = (x={...person}) => {
  x.age += 1;
  x.name = 'sss'
}

changeAge(person);
changeAgeAndName();
console.log(person);
```

调用changeAge并且传person参数，改变了person对象

调用changeAgeAndName 没有传参 不会改变person对象

---



```js
JSON.stringify()
将js对象或者值转换为JSON字符串，

JSON.parse()
解析JSON字符串，由字符串描述的js对象或值
```

---



```js
class Bird {
  constructor() {
    console.log(1)
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log(2)
    super()
  }
}

const pet = new Flamingo();
```

实例化Flamingo，调用constructor，输出2，调用super（）输出父类的constructor

---

~~~js
const info = {
  [Symbol('a')]: 'b'
}

console.log(info); // {Symbol('a'):'b'}
console.log(Object.keys(info)); // []
~~~



