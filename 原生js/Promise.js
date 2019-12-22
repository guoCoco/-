// 定义三种状态，
const PENDING = 'pending';
const FULFILED = 'fulfilled';
const REJECTED = 'rejected';


/**
 * const p = new Promise((resolve, reject) => {
 *  do something...
 *  setTimeout(() => {resolve()},1000)
 * })
 * 
 * */ 

// 创建Promise 函数
function Promise(executor) {
  /** 执行executor 前初始化 promise准备工作
   * 1. 初始状态为 pending
   * 2. 声明两个 executor 的参数
   * 3. 成功回调的列表，和失败回调的列表
   * 
   * */
  this.status = PENDING;

  this.onFulfilled = []; 
  this.onRejected = [];

  const resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILED;
      this.value = value;
      this.onFulfilled.forEach(fn => fn());
    }
  }
  const reject = (reason) => {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
      this.onRejected.forEach(fn => fn());
    }
  }

  try {
    executor(resolve, reject);
  }catch(e) {
    // 执行过程中，如果出错，执行 reject,
    reject(e);
  }

}

// 实现then方法
Promise.prototype.then = function(onFulfilled, onRejected) {
  // onFulfilled onRejected必须是函数，是可选参数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

  // then方法需要返回一个promise
  const self = this;
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILED) {
      setTimeout(() => {
        try{
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        }catch(err) {
          reject(err)
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try{
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch(err) {
          reject(err)
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err)
          }
        })
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        });
      })
    }
  });

  return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  if (promise2 === x) {
    reject(new TypeError('chaining cycle'));
  }

  if (x && typeof x === 'object' || typeof x === 'function') {
    let used;
    try{
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (used) return;
          used = true;
          reject(r)
        })
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch(err) {
      if (used) return;
      used = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}


