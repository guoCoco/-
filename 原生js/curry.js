/**
 * 什么是函数柯里化？ 
 * 函数柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
 * 并且返回接受余下参数而且返回结果的新函数的技术
 * */ 


//  function curry(fn, args = []) {

//     // 返回一个函数
//     return function() {
//       let rest = [...args, ...arguments];
//       if (rest.length < fn.length) {
//         return curry.call(this, fn, rest)
//       } else {
//         return fn.apply(this, rest);
//       }
//     }
//  }


function curry (fn, args = []) {
  return function() {
    let rest = [...args, ...arguments];
    if (rest.length < fn.length) {
      return curry.call(this, fn, rest);
    } else {
      return fn.apply(this, rest);
    }
  }
}

function sum(a,b,c,d) {
  return a+b+c+d;
}
let sumFn = curry(sum);
console.log(sumFn(1)(2)(3)(4)); //6
console.log(sumFn(1)(2, 3)(4)); //6


