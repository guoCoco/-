# Event-loop 事件循环  

## 前置知识  
- 所有任务分为同步任务 和 异步任务。
  同步任务指在主线程上执行的任务。只有前一个任务执行完毕，才能执行下一个任务；  
  异步任务，不进入主线程，进入任务队列的“task queue”的任务。
- 所有的同步任务都在主线程上执行，形成一个执行栈（execution context stack）
- 主线程外，还存在一个 任务队列 。只要异步任务有了运行结果，就在 任务队列 中放置一个事件
- 一旦 执行栈 中所有的同步任务执行完毕，系统就会读取  任务队列 ，查看里面有哪些事件。那些对应的异步任务，于是结束当前的等待状态，进入执行栈，开始执行。
- 主线程不断重复上面的第三步

## 任务队列  
- 事件的队列，异步任务完成之后，就在 任务队列  中添加一个事件，表示相关的异步任务可以进入 执行栈  了。主线程读取 任务队列，就是读取里面有哪些事件。

## Event Loop  
主线程从“任务队列”中读取事件，这个过程是循环不断的，所以整个这种运行机制又称为event loop(事件循环)。浏览器和node环境的Event loop还有些区别。
- js中，任务分为 宏任务 Macro Tash 和 微任务 Micro Task两种。
  Macro Task: setTimeout setInterval setImmediate(node环境) I/O rendering script加载
  Micro Task: process.nextTick(node环境) Promise Object.observe MutationObserver
  - 执行顺序
  执行栈同步任务 => Micro Task => Macro Task
- 浏览器 Event Loop  
  - 浏览器的执行规则：
    浏览器 从 macro Task队列中按照顺序取task执行，每执行完一个 Macro Task都会检查microtask队列是否为空（执行完一个 Macro Task的标志是主线程执行栈为空），如果不为空会一次性执行完所有的microtask.然后再进入下一个循环去macrotask队列中取下一个task执行，依次类推。

- node 环境的Event loop
  - event loop中的6个阶段  
    - timers: 执行 setTimeout() 和 setInterval() 中到期的callback
    - I/O callback: 上一轮循环中有极少数的I/O callback
    - idle prepare: 仅内部使用
    - poll: 最重要的阶段，执行I/O callback,在适当的条件下会阻塞在这个阶段
    - check: 执行 setImmediate 的 callback
    - close callback: 执行close事件的callback.
