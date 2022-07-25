// class Person{
//     constructor(name,age,grade){
//       this.name = name;
//       this.age = age;
//       this.grade = grade;
//     }
//     // get write() {
//     //   return this.grade;
//     // }
//     // set write(value) {
//     //   this.grade += value;
//     // }
//     run () {
//       console.log('run');
//     }
//   }

//   // const he = new Person('Tom',24,60);
//   // he.write = 99;
//   // console.log(he.write);
// console.log(typeof Person);
// console.log(Person.prototype);
// console.log(Person.prototype.constructor === Person);
//   const Tom = new Person('Tom',23)
//   Tom.run();


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

class FooChild extends Foo {}

console.log(FooChild.classMethod());
Foo.baz();