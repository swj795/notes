const PromiseStatus = {
    pending: 'pending',
    resolved: 'resolver',
    rejected: 'rejected',
  };
  
  class MyPromise {
    constructor(fn) {
      this.status = PromiseStatus.pending;
      this.value = null;
      this.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
  
      const resolve = (value) => {
        if (this.status === PromiseStatus.pending) {
          this.status = PromiseStatus.resolved;
          this.value = value;
          this.resolvedCallbacks.forEach((cb) => cb(value));
        }
      };
  
      const reject = (value) => {
        if (this.status === PromiseStatus.pending) {
          this.status = PromiseStatus.rejected;
          this.value = value;
          this.rejectedCallbacks.forEach((cb) => cb(value));
        }
      };
  
      try {
        fn(resolve, reject);
      } catch (e) {
        this.reject(e);
      }
    }
  
    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        const onFulfilledTmp = typeof onFulfilled === 'function' ? (value) => resolve(onFulfilled(value)) : resolve;
        const onRejectedTmp = typeof onRejected === 'function' ? (value) => resolve(onRejected(value)) : reject;
  
        if (this.status === PromiseStatus.pending) {
          this.resolvedCallbacks.push(onFulfilledTmp);
          this.rejectedCallbacks.push(onRejectedTmp);
        }
  
        if (this.status === PromiseStatus.resolved) {
          onFulfilledTmp(this.value);
        }
  
        if (this.status === PromiseStatus.rejected) {
          onRejectedTmp(this.value);
        }
      });
    }
  
    catch(onRejected) {
      this.then(undefined, onRejected);
    }
  }

  const p = new MyPromise((resolve,rea) => {
      console.log(1);
    resolve('成功')
      console.log(2);
  })
  p.then(res=> {console.log(res)})
  console.log(3);