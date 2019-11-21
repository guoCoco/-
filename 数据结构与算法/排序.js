/**
 * 什么是复杂度
 * 
 * 一个算法 计算的效率 或者说 计算的有多快  用 O 表示 表示一个量级
 * 
 * 比如比较常见的 冒泡排序算法复杂度  O(n^2)
 *               快速排序的算法复杂度 是  O(n*lgn)
 * */ 


// 用两种方式实现数组的排序 

// 冒泡排序 复杂度是 O(n^2)
/**
 * 1. 相邻的两个数比较 值大的 放后面 值小的 放前面
 * 2. 如果前面的值大于后面的 两个值 交换位置
 * */ 
arr = [10, 5, 3, 6, 12, 14, 7, 67,45,23]

function bubblingSort(arr) {
  for(var j = 0; j < arr.length - 1; j++) {
    for(var i = 0; i < arr.length - 1 - j; i++) {
      // 最大的值就到最后了
      if (arr[i] > arr[i+1]) {
        var temp = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = temp
      }
    }
  }
  console.log(arr)
  return arr;
}

// bubblingSort(arr)


// 快速排序  复杂度 O(nlogn)
/**
 * 选第一个数值作为一个比较值 
 * 遍历这个数组 比这个值小的放左边  比这个值大的放右边，
 * 
 * 这个确定是  比较浪费空间 因为使用了两个中间变量
 * */ 

 function quickSort(arr) {
  // 注意 递归一定要有出口
   if (arr.length <= 1) {
      return arr
   }
   let flag = arr[0]
   let left = []
   let right = []
   for (let i = 1; i < arr.length; i++) {
     if (arr[i] > flag) {
       right.push(arr[i])
     } else {
        left.push(arr[i])
     }
   }
   return quickSort(left).concat(flag).concat(quickSort(right))
 }
 console.log(quickSort(arr))