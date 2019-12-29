# Vue
- Vue中的key作用  
  key是每一个vnode的唯一id,依靠key,我们的diff操作可以更准确，更快速  
  diff算法的过程中，先会进行新旧节点的首位交叉对比，当无法匹配的时候会用新节点的key与旧节点进行对比，从而找到相对应的旧节点  
  key 的唯一性可以被map数据结构充分利用，相当于遍历查找的时间复杂度O(n),Map的复杂度仅仅为O(1)  
  可以更准确，使用唯一key的方式不是就地复用，

- Vue 3.0采用Proxy，不使用Object.defineProperty()？
  Object.definedPropery()本身可以监控数组下标，但是在Vue中，为了兼顾性能和体验，Vue作者就没有做数组的下标进行监听。但是在项目开发中，数组的使用有事必不可少，就采用了其他方式来进行对数组的监听，也是使用Object.defineProperty()，对数组方法进行监听。总共监听了7个数组的方法，分别是： 
  push() pop() shift()  unshift()  sort() reverse()  splice()   
  使用Object.defineProperty()只能劫持对象的属性，所有需要对对象的每个属性进行遍历，Vue2中通过递归遍历 data对象对数据的监控，如果属性值也是对象，再次遍历。因此劫持一个完整的对象才是更好的选择，。  
  Proxy可以劫持整个对象，并返回一个新的对象，Proxy不仅可以代理对象也可以代理数组。还可以代理动态添加的属性。这些都是Object.defineProperty无法提供的。  

- nextTick原理  
  Vue在更新DOM时是异步执行的。只要侦听到数据变化,Vue就开启一个队列，并缓冲在同一个事件循环中发生的所有数据变更  
  同一个watcher被多次触发，只会被推入到队列中一次。这种缓冲时去除重复数据对避免不必要的计算和DOM操作是非常重要的。
  （主线程的执行过程就是一个tick）  
  然后，在下一个的事件循环‘tick’中，Vue刷新队列并执行实际的工作  
  Vue在内部对异步队列使用原生的Promise.then/MutationObserver/setImmediatee,和setTimeout(fn, 0);  
  vue的nextTick方法的实现原理：  
  1. vue用异步队列的方式来控制DOM更新和nextTick回调先后执行  
  2. microtask具有高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕。
  3. 考虑兼容性,Vue做了Microtask向macrotask的降级方案  

- Vue是如何对数组方法进行变异？
  Vue对数组原型对象（Array.prototype）进行拦截重写了数组的7个方法 push pop unshift shift reserve sort splice .先获取数组的 __ob__对象，也是Observer对象。如果数组有新的值也就是调用了数组的push unshift splice添加了新的数组项，对新添加的数组项进行监听。当然只有数组执行了以上7个方法，都会调用了nofity去通知watcher,执行update,更新dom.  

- Vue组件data为啥都是函数。
  new Vue() 实例中，data可以直接是一个对象，为啥vue组件中，data必须是一个函数  
  因为组件是复用的，JS里对象是引用关系，如果data使用对象，那么子组件中的data属性值会相互污染，产生副作用。 
  所以一个组件的data选项必须是一个函数。因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue的实例是不会被复用的，所以不存在以上问题。  

- Vue的事件机制  
  Vue事件机制本质上就是一个发布订阅模式  

- Vue的渲染过程  
  new Vue() => this._init()初始化 initRender callHook('beforeCreate') initState callHook('creted')等 =>  $mount() => compiler => render() 返回VNode => _update() 中调用 patch(patch方法返回的是真实DOM) => DOM


- keep-alive的实现原理和缓存策略  、
  1. 获取keep-alive包裹的第一个子组件对象及组件名  
  2. 根据设定的include/exclude（如果有）进行条件匹配，觉得是否缓存。不匹配就直接返回组件实例。
  3. 根据组件的ID和tag生成缓存key,并在缓存对象中查找是否已经缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置
  4. 在this.cache对象中存储该组件实例并保存key值，之后检测缓存实例是否超过max的设置的值，超过就删除最近最久未使用的实例即下标为0的那个key  
  5. 最后实例的keepAlive属性设置为true,这个在渲染和执行被包裹组件的钩子函数中会用到。

  keep-alive是Vue中内置的抽象组件。实现自定义的render方法

- vm.$set方法 实现原理是什么
  1. 如果是数组，调用splice方法对数组进行改变，因为splice方法是一个被监听的方法，调用之后，改变的数据就通过数组 observer对象进行监听，执行更新。
  2. 如果目标是对象，判断属性是否存在，存在的话本身就是响应式的，就直接复制
  3. target本身不是响应式数据，直接赋值
  4. 如果属性不是响应式的，则调用defineReactive方法进行响应式处理




- Virtual DOM？
  VNode就是一个js对象描述一个DOM节点，核心就是几个关键属性标签名，数据，子节点 键值等，其他的属性用了或者VNode的灵活性及特殊的feature。因为VNode是来映射到真实DOM的渲染，不需要包括Dom操作的方法，因此比较轻量。  
  VNode映射到真实的DOM要经历，create diff patch等过程，


## Vue组件化    snabbdom库

