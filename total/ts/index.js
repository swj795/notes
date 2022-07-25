"use strict";
// const numArr :number[] = [1,2,3,4,5];
// const numAndStringArr :(number|string)[] = [1,'s']
// const arr :Array<number> =[1,2,3]
// const tuple :[number,string,boolean] = [1,'s',true];
// enum Color {red=1,green,pink=8}
// console.log(Color[1]);
// function read ():void {
//     console.log('read');
// }
// read()
// function fail():never {
//     throw new Error('message')
// }
// // let person:{name:string,age: number} = {name:'sss',age:18}
// const str:any = '99';
// const num:number = str as unknown as number;
// console.log(num);
// const num1:number = (<string>str).length
// let luckyNum : string | number ;
// luckyNum = 'six'
// luckyNum = 6
// interface People {
//     name: string;
//     age: number;
//     // 可选属性
//     lastName?: string;
//     readonly weight: number;
// }
// function createPerson (p:People) {
//     // console.log(p.name);
//     return p;
// }
// let p = createPerson({name:'s',age: 18,weight:100})
// interface SearchFun {
//     (source : string, rex : string) : boolean
// }
// let mySearch : SearchFun;
// mySearch = function(src,rex) {
//     const res = src.search(rex);
//     return res > -1
// }
// interface stringArr {
//     readonly [index:number]:string
// }
// let arr2 : stringArr = ['s','w']
// console.log(arr2[2]);
// function add (x :number | string , y : number | string) : any{
//     if(typeof x === 'number' && typeof y === 'number') {
//         return x + y
//     }else if (typeof x === 'string' && typeof y === 'string') {
//         return x + y
//     }
// }
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.getName = function () {
        console.log(this.name);
    };
    Animal.prototype.move = function (mile) {
        console.log("move " + mile + "m");
    };
    return Animal;
}());
// class Sanke extends Animal {
//     constructor(name:string){super(name)}
//     move(mile: number): void {
//         console.log('ssssss');
//         super.move(mile)
//     }
// }
// class Preson {
//     name:string;
//     protected constructor(name:string) {
//         this.name = name;
//     }
// }
// class Man extends Preson {
//     constructor(name:string) {
//         super(name)
//     }
// }
// // let passcode = "secret passcode";
// // class Employee {
// //     private _fullName: string;
// //     constructor (name:string){
// //         this._fullName = name;
// //     }
// //     get fullName(): string {
// //         return this._fullName;
// //     }
// //     set fullName(newName: string) {
// //         if (passcode && passcode == "secret passcode") {
// //             this._fullName = newName;
// //         }
// //         else {
// //             console.log("Error: Unauthorized update of employee!");
// //         }
// //     }
// // }
// // let employee = new Employee('s');
// // employee.fullName = "Bob Smith";
// // if (employee.fullName) {
// //     alert(employee.fullName);
// // }
// // class User {
// //     static instance: User | null = null;
// //     protected constructor() { }
// //     public static make(): User {
// //         if (User.instance == null) User.instance = new User;
// //         return User.instance;
// //     }
// // }
// // const hd = User.make();
// // console.log(hd);
// abstract class Department{
//     constructor(){}
//     abstract printMeeting() : void;
// }
// class AccountDepartment extends Department{
//     constructor() {
//         super()
//     }
//     printMeeting(): void {
//         console.log('88');
//     }
// }
// let department : Department;
// // department = new Department() 
// interface LengthWise {
//     length: number
// }
// function loggingIdentity <T extends LengthWise>(arg:T) :T {
//     console.log(arg.length);
//     return arg
//   }
//   loggingIdentity({length:3})
// interface createArr<T> {
//     (length:number,value: T): Array<T>
// }
// function createArrFn <T>(length:number,value:T):Array<T>{
//     let result : T[] = [];
//     for(let i = 0; i < length; i++ ){
//         result[i] = value
//     }
//     return result;
// }
// let myCreatArrFn :createArr<any> = createArrFn 
// class GenericNumber<T> {
//     zeroValue!: T;
//     add!: (x: T, y: T) => T;
// }
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x,y) {return x + y };
function add1(a, b) {
    return a + (b || 0);
}
console.log(add1(1, undefined));
var people;
var Lesson = /** @class */ (function () {
    function Lesson(name) {
        this.name = name;
    }
    return Lesson;
}());
var Axios = /** @class */ (function () {
    function Axios() {
        console.log('创造实例');
    }
    Axios.make = function () {
        // 一开始instance为空 
        // 只能进行一次赋值
        if (Axios.instance == null) {
            Axios.instance = new Axios();
        }
        return Axios.instance;
    };
    // private关键字 设置了该属性不能在外部调用
    // static关键字 设置了该属性存在于构造函数上
    Axios.instance = null;
    return Axios;
}());
var instance = Axios.make();
var Players = /** @class */ (function () {
    function Players() {
        this.name = '玩家坦克';
    }
    Players.prototype.end = function () {
        console.log('游戏结束');
    };
    Players.prototype.move = function () {
        console.log('坦克移动');
    };
    return Players;
}());
function lock(user) {
    if (!user.isLock) {
        user.isLock = true;
    }
    return user;
}
function getLength(arg) {
    return arg.length;
}
var piao = {
    title: '飘',
    isLock: true,
    comments: [{ autor: 'buzhidao', content: '.....' }]
};
