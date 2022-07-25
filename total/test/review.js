// const a = '123';
// const b = 123;
// console.log(a === b);  
// console.log(a == b); 

// console.log(1 < 2 < 3);  true
// console.log(3 > 2 > 1); false
// 1 < 2 为 true 转化成1  1 < 3 所以为true
// 3 > 2 为 true 转化成1  1 > 1 为false

// 虽然用了立即函数 并没有将每一次循环的i传进去 还是同步任务之后的i
// for (var i = 0; i < 5; i++) {
//     (function() {
//           setTimeout(function() {
//                console.log(i);
//            }, i * 1000);
//      })(i);
// }

// for (var i = 0; i < 5; i++) { 
//     (function(i){      //立刻执行函数
//        setTimeout(function (){
//            console.log(i);  
//         },1000); 
//     })(i);	
// }


var a = 10;

var foo = {
    a: 20,
    b: function(){
        var a = 30;
        console.log(this,1);
        // this 指向foo对象
        return this.a;
},
    c: () => {
        var a = 40;
        console.log(this,2);
        return this.a;
    },
}

var d = {
    a: 50,
};

console.log(foo.b());  20
console.log(foo.c());  // 在浏览器中 10 在node中undefined 是global
console.log(foo.b.bind(d)()); 50
console.log(foo.c.bind(d)());  // 在浏览器中 10 在node中undefined
 // 箭头函数的this指向是固定的 不可改变

// console.log('datagrand1');
// setTimeout(() => {
//        console.log('datagrand2');
// });
// const p1 = new Promise(resolve => {
//        console.log('datagrand3');
//        resolve();
// });
// p1.then(() => {
//         console.log('datagrand4');
// });
// console.log('datagrand5');
// const p2 = new Promise(resolve => {
//         console.log('datagrand6');
//         resolve();
// });
// p2.then(() => {
//        console.log('datagrand7');
// });

// 1 3 5 6 4 7 2


