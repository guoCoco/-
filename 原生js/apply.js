// 


Function.prototype.apply = function(context, rest) {
  context.fn = this;

  return context.fn(...rest)
}


Function.prototype.apply = function(context, arr) {
  context.fn = this;

  if (Array.isArray(arr)) {
    return context.fn(...arr);
  }
  return context.fn(arr);
}