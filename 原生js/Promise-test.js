
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  this.status = PENDING;
  this.onRejected = [];
  this.onFulfilled = [];

  const self = this;

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILED;
      self.value = value;
      self.onFulfilled.forEach(fn => fn());
    }
  }
  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject);
  } catch(err) {
    reject(err);
  }

}


// 定义then方法
Promise.prototype.then = function(onFulfilled, onRejected) {
  // then方法的参数两个是可选的 而且都是函数类型
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason};

  const self = this;

  let promise2 = new Promise((resolve, reject) => {
    // onFulfilled onRejected 是异步执行
    // 根据上一个promise的状态去执行响应的 函数
    if (self.status === FULFILED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch(err) {
          reject(err)
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.resason);
          resolvePromise(promise2, x, resolve, reject);
        } catch(err) {
          reject(err);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try{
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try{
            let x = onRejected(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      });
    }
  })

  return promise2

}


function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) throw TypeError('chaining cycle');
  let self = this;
  if (typeof x === 'object' || typeof x === 'function') {
    let used;
    try {
      let then = self.then;
      if (typeof then === 'function') {
        then.call(x, (y)=> {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (used) return;
          used = true;
          reject(r);
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


// 定义Promsie静态方法

/**
 * Promise.resolve(param)  返回一个promise对象
 * */ 
Promise.resolve = function(value) {

  if (value instanceof Promise) {
    return value
  }

  return new Promise((resolve, reject) => {
    // 如果value是个对象的then方法存在，而且是一个函数
    if (value && value.then && typeof value.then === 'function') {
      setTimeout(() => {
        value.then(resolve, reject);
      });
    } else {
      resolve(value);
    }
  });
}

/**
 * Promise.reject(reason);
 * 变成一个 rejected的 promise
 * 
*/

Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
}


// 实例 catch方法  特殊的then方法， 可以继续then

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}


// Promise.prototype.finally  不论成功失败，都会走到finally,之后可以继续then
Promise.prototype.finally = function(callback) {
  return this.then((value) => {
    return new Promise.resolve(callback()).then(() => {
      return value;
    })
  }, (reason) => {
    return new Promise.reject(callback()).then(null, () => {
      return reason;
    })
  })
}
