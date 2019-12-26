/**
 * call 为原型上的方法
 * 修改函数的上下文
 * 立即执行
 * 参数是多个
 * */ 

 Function.prototype.call = function(context) {
    let rest = [...arguments].slice(1);

    context.fn = this;

    return context.fn(...rest);
 }