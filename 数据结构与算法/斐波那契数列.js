// 基础版本 递归方式  
function fib(n) {
  if (n === 1 || n === 2) {
    return 1
  }
  return fib(n-1) + fib(n-2)
}

console.log(fib(45))

// 递归优化版本 计算过的使用缓存
function fibcache(arr, n) {
  if (n === 1 || n === 2) {
    return 1
  }
  if (arr[n]) arr[n]
  arr[n] = fibcache(n-1) + fibcache(n-2)
  return arr[n]

}
function fib1(n){
  let arr = []
  return fibcache(arr, n)
}



// 动态规划方式
function fibDT(n) {
  let arr = [0,1,1]
  for(let i = 3; i <= n; i++){
    
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n]
}

console.log(fibDT(45))