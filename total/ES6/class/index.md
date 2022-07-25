# class

class只是一个语法糖，让对象原型更加清晰。

```js
class People {
  constructor (name,age) {
    this.name = name;
    this.age = age;
  }
  run () {
    console.log('run')
  }
}

console.log(typeof People) // function
console.log(People.prototype)
console.log(People.prototype.constrcutor === People) // true
const Tom = new People('Tom',24);
```



```js

class Person{
    constructor(name,age,grade){
      this.name = name;
      this.age = age;
      this.grade = grade;
    }
    get write() {
      return this.grade;
    }
    set write(value) {
      this.grade += value;
    }
  }

  const he = new Person('Tom',24,60);
  he.write = 99; // 调用set
  console.log(he.write); // 调用get
```

#### 静态方法

在一个方法前加上static关键字，该方法不会被实例继承，直接通过类来调用

```js
class Foo{
  static classMethod (){
    return 'hello'
  }
  static bar () {
    console.log('1')
  }
  static baz () {
    return this.bar()
  }
  bar () {
    console.log('2');
  }
}

Foo.baz() // 1
// 静态方法中包含this方法，这个this指的是类，而不是实例，静态方法与非静态方法可以重名

Foo.classMethod() // hello
const foo = new Foo();
foo.classMethod() // TypeError 
// 在实例上调用静态方法，会抛出一个错误

class FooChild extends Foo {}
FooChild.classMethod(); // hello 
// 父类的静态方法可以被子类继承

// 静态方法也可从super对象上调用
```



