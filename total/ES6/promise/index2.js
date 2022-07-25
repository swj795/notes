class MyPromise {


    // 构造函数
    constructor(executor){
        // 设置初始状态
        this.state = MyPromise.PENDING;
        // 设置成功返回的值
        this.value = undefined;
        // 设置失败的原因
        this.reason = undefined;

        // 设置存放成功的数组
        this.onFulfilledCallbacks = [];
        // 设置存放失败的数组
        this.onRejectedCallbacks = [];

        // 成功情况
        let resolve = (value) => {
            if(this.state === MyPromise.PENDING) {
                setTimeout(() => {
                    this.state = MyPromise.FULFILLED;
                    this.value = value;
                    // 数组中存放的是一个个函数
                    // 执行resolve看一下数组是否有任务 
                    // 遍历数组 执行数组中的函数并传值进去
                    this.onFulfilledCallbacks.forEach(fn => fn(value))   
                });
            }
        };

        // 失败
        let reject = (reason) => {
            if(this.state === MyPromise.PENDING) {
                setTimeout(() => {
                    this.state = MyPromise.REJECTED;
                    this.reason = reason;
                    // 同resolve
                    this.onRejectedCallbacks.forEach(fn => fn(reason))   
                });

            }
        };

        // 如果立即执行报错，直接reject
        try{
            // 立即执行
            executor(resolve,reject)
        }catch(e) {
            reject(e)
        }

    }
    // then方法
    then (onFulfilled,onRejected) {
        // 
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

        // 解决链式调用
        let promise2 = new MyPromise((resolve,reject) => {
        // 成功状态 执行onFullilled
        if(this.state === MyPromise.FULFILLED) {
            // 实现异步
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2,x,resolve,reject);
                }
                catch(e){
                    onRejected(e);
                }
            });
        }
        // 失败状态 执行onRejected
        if(this.state === MyPromise.REJECTED) {
            // 实现异步
            setTimeout(() => {
             try {
                let x = onRejected(this.reason);
                resolvePromise(promise2,x,resolve,reject)
             } catch(e) {
                onRejected(e)
             }
            });

        }
        // 初始状态
        if(this.state === MyPromise.PENDING) {
            // 成功的放在成功的数组中
            this.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                 try{
                     let x = onFulfilled(this.value);
                     resolvePromise(promise2,x,resolve,reject);
                 } catch(e) {
                     reject(e);
                 }
                });
            })
            // 失败的放在失败的数组中
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                 try {
                     let x = onRejected(this.reason);
                     resolvePromise(promise2,x,resolve,reject)
                 } catch (e) {
                     reject(e);
                 }
                });
            })
        } 
        });
        return promise2;
    } 
}

/*
1、then是返回一个promise对象，这样就可以链式调用
2、无论第一个promise是fulfilled还是rejected都不会影响第二个
3、promise解决过程调用resolvePromise()方法
*/ 
/** 
 * @param {promise2} then中返回的promise实例
 * @param {x}  promise1中resolve或者reject返回的值
 * @param {resolve} promise的resolve方法
 * @param {reject} promise的reject方法
*/

function resolvePromise (promise2,x,resolve,reject) {
    if(promise2 === x) {
        return reject(new Error('Chaining cycle detected for promise'))
    }
    // 防止多次调用
    let called;
    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;
            if (typeof then === 'function'){
                // 成功失败只能调用一次
                if(called) return;
                called = true;
                // call的第一个参数是this的指向，后面的参数都是传入函数的参数
                then.call(x,y => {
                    resolvePromise(promise2,y,resolve,reject)
                },err => {
                    // 成功失败只能调用一次
                    if(called) return;
                    called = true;
                    reject(err);
                })
            }else {
                resolve(x);
            }
        }
        catch (e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// 测试代码1
// const p = new MyPromise((resolve,reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(p.state);
//         resolve('成功了');
//         console.log(2);
//     });
// })

// 此时成功了不输出 因为此时p的状态还是pending

const p = new MyPromise ((resolve,reject) => {
    console.log(1);
    resolve('成功');
})
p.then(res => console.log(res))
console.log(2);


