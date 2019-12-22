
var obj = new Proxy({}, {
  //  参数1 拦截的目标对象， 参数2 所要访问的对象，
  get: function(target, propKey, receiver) {
    console.log(target, propKey)
    return 1
  },
  set: function() {

  }
});
console.log(1)

console.log(obj.a);

// var proxy = new Proxy(target, handler);
// target 为拦截的目标对象
// handler 也是一个对象，用来定义拦截行为