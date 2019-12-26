/**
 * bind 方法实现，分析
 * 每个函数都拥有的方法
 * fn.bind(obj)
 * */ 


//  Function.prototype.bind = function() {

//   let thatFn = this; // fn

//   let thatArg = arguments[0]; // obj

//   let args = [].slice.call(arguments, 1); // bind 第二个参数及后面参数组成的数组

//   if (typeof thatFn !== 'function') {
//     throw Error('只有函数才能使用bind方法')
//   }

//   return function () {
//     // 再拼接上最后调用的参数
//     let fnArgs = [...args, ...arguments]
//     return thatFn.apply(thatArg, fnArgs);
//   }
//  }






 Function.prototype.bind = function(context, ...args) {

    const fn = this;

    return function(...selfArgs) {
      return fn.apply(context, [...args, ...selfArgs])
    }
 }


 fn = function() {
   console.log(this.name)
 }

 obj = {
   name: '1'
 }
 fn.bind(obj)();



 Function.prototype.bind1 = function(context) {
   const args = [...arguments].slice(1);

   const fn = this;

   return function() {
    return context.fn(...args, ...arguments)
   }
 }