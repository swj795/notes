// promise 有三种状态
const PENDING = "pending"; // 初始状态
const REJECTED = "rejected"; // 失败状态
const FULFILLED = "fulfilled"; // 成功状态

class MyPromise {
    constructor(executor) {
        // 初始状态
        this.state = PENDING;
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;

        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks = [];

        // 成功的回调函数
        let resolve = (value) => {
            if (this.state === PENDING) {
                setTimeout(() => {
                    this.state = FULFILLED;
                    this.value = value;
                    // console.log(this.value);
                    // 执行了resolve，调用成功数组的函数,将resolve的值传进去
                    this.onResolvedCallbacks.forEach((fn) => fn(value));
                });
            }
        };
        // 失败的回调函数
        let reject = (reason) => {
            if (this.state === PENDING) {
                setTimeout(() => {
                    this.state = REJECTED;
                    this.reason = reason;
                    // console.log(this.reason);
                    // 执行reject，调用失败数组的函数，将reject的reason传递进去
                    this.onRejectedCallbacks.forEach((fn) => fn(reason));
                });
            }
        };
        // 执行报错，进入reject
        // 用来捕获错误
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    // then 是实例创建后调用的 不能声明在constructor中
    // then接受俩个参数，onFulfilled onRejected
    // onFulfilled onRejected 是传进来的
    then(onFulfilled, onRejected) {
        // onFulfilled 如果是函数类型就执行onFulfilled的逻辑 如果不是就直接将值返回
        onFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (value) => value;
        // onRejected 如果是函数类型就执行onRejected的逻辑 如果不是就将错误抛出
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                    throw reason;
                };
        let promise2 = new MyPromise((resolve, reject) => {
            // 成功执行onFulfilled
            if (this.state === FULFILLED) {
                // 实现异步一定要在状态判定之后
                setTimeout(() => {
                    let x = onFulfilled(this.value);
                    reslovePromise(promise2, x, resolve, reject);
                });
            }
            // 失败执行onReject
            if (this.state === REJECTED) {
                setTimeout(() => {
                    let x = onRejected(this.reason);
                    reslovePromise(promise2, x, resolve, reject);
                });
            }
            if (this.state === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            reslovePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason);
                            reslovePromise(promise2,x,resolve,reject);
                        }
                        catch(e) {
                            reject(e);
                        }
                    })
                });
            }
        });
        return promise2
    }
}

// 判断x

function reslovePromise(promise2, x, resolve, reject) {
    if(x === promise2){
        return reject(new TypeError('chaining cycle detected for promise'))
    }
    // 防止多次调用
    let called;
    if (x instanceof MyPromise) {
        if(x.state === MyPromise.PENDING) {
            x.then(y => {
                reslovePromise(promise2,y,resolve,reject)
            },reject)
        }
        else if(x.state === MyPromise.FULFILLED) {
            resolve(x.value);
        }
        else if(x.state === MyPromise.REJECTED) {
            reject(x.reason)
        }
    }else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // x不为null 且x为对象或者函数时
        try {
            // A+规定 
            let then = x.then;
            
            // then是函数默认为promise
            if (typeof then === 'function') {
                then.call(x,y =>{
                    if(called) return;
                    called = true;
                     reslovePromise(promise2,y,resolve,reject)
                },err => {
                    if(called) return; 
                    called = true;
                    reject(err)
                })
            }else {
                resolve(x);
            }
        }
        catch(e){
            if (called) return;
            called = true;
            reject(e);
        }
    }else {
        resolve(x);
    }
}



// 测试代码
console.log(1);
let promise1 = new MyPromise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        resolve("成功了");
        console.log(4);
    });
});
// console.log(MyPromise.prototype.then);
// console.log(promise1);
promise1.then(
    (res) => {
        console.log(promise1.state);
        console.log(res);
    },
    (err) => console.log(err)
).then(value => console.log(value))
console.log(3);

// 链式问题
// 第一个then返回的值x
// 首先 判断x是否为promise
// 是promise 直接作为promise2成功的结果
// 是普通值 直接作为promise2成功的结果
