## jsx
- 什么是jsx  
标签语法 在js中 包含 html标签
- jsx如何渲染成dom
- 为什么要有jsx

- jsx中签入js表达式  
在js中可以使用{}，在{}内可以使用任何*js表达式*。在使用过程中，如果jsx内容较多，可以使用分行展示，将内容包含在()中。这是一个规范。  

- jsx也是一个表达式  
就是说jsx可以赋值给变量，可以当做函数参数，可以作为函数的返回值。所以可以在if for等代码块中使用  

- jsx特定属性  
jsx（如 <h1 id='hq'>hello world</h1>）就是html标签写法，它也有自己的属性，就相当于标签属性。指定这些属性值可以是字符串字面量或者 使用 {} js表达式的形式。注意：jsx中class变成className, tabindex 变成 tabIndex  

- jsx 子元素 可以像html一样嵌套，但是最外层要有一个元素包裹

- jsx表示对象  
babel会将jsx转译成名为 React.createElement()函数调用  
```
const element = (
  <h1 class='title'>
    hello world
  </h1>
)

// 与下面的等价

const element = React.createElement(
  'h1',
  {className: 'title'},
  'hello world'
)

```
React.createElement()创建的对象称为 React元素  

## 元素渲染  

react元素和 DOM对象不同，React元素是创建出的对象，ReactDOM会负责更新DOM与React元素一致。

- 将元素渲染成DOM  
构建react应用有一个根DOM节点，将React元素渲染到根DOM节点，需要调用 ReactDOM.render():
```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

- 如何更新已经渲染的元素？  
React 只更新它需要更新的部分，React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。


## 组件&props  

组件，类似js函数。接收任意的入参（即 porps）,并返回用于描述页面展示内容的React元素  

- 函数组件  与  class组件  


- 渲染组件  

React元素可以是 DOM标签， 也可以是 用户自定义组件。 当React元素为自定义组件时，它会将jsx所接收的属性转换为单个对象传递给组件，这个对象称为 'props' ，这些属性都是props对象的key.  

注意： 组件名必须以大写字母开头，小写开头的会被当做DOM标签。  

- 组合组件  
在组件的输出中引入其他组件。 

- props的只读性  
组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。props是组件的入参。  


## state & 生命周期  

state 与 props类似，state是私有的，完全作用于当前组件，相当于函数的局部变量。  
class组件每次更新时render方法都会被调用，但是只要在相同的DOM节点中渲染<Clock />，就仅有个Clock组件的class实例被创建使用。  
- class组件 中可以有生命周期方法

- 生命周期方法  
1. componentDidMount() 方法在组件已经渲染到DOM后执行，可以在这个时候设置定时器，ajax请求等副作用 
```
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
``` 
计时器的 timerId保存在this上，而不是this.state上，在class组件中可以随意添加不参加数据流的额外字段
2. componentWillUnmount() 可以自组件销毁前进行一些内存的释放如清除定时器  

- 正确使用 state  
*关于setState*
1.  不要直接修改 State  
2. 而是应该使用 setState()  
3. 构造函数是唯一可以给 this.state 赋值的地方 也就是 constructor函数  

- state更新可能是异步的 
出于性能考虑，React可能会将 setState合并为一个调用  
如果更改状态依赖上一次的 state 和 props，setState参数接收一个函数，这个函数的第一个参数是state 第二个参数是props

- 数据是向下流动的  
react中 是 “自上而下”或是“单向”的数据流。任何state总是所属于特定的组件，而且从state派生的任何数据或ui只能影响树中低于他们的组件


## 事件处理  
React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同:  
- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
- 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为，你必须显式的使用 preventDefault。

**注意事项**  
- JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。可以使用两种方式修改this 绑定到class组件实例  
  1. class中定义的方式使用箭头函数方式  
  2. 在构造函数中使用bind修改this指向 

- 向事件处理程序传递参数  
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。 

在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。  


## 条件渲染  

- if 三目运算符  

- &&  在jsx中 使用短路运算符

- 阻止组件渲染  

组件返回值为 null 或render方法返回 null ，就不会进行渲染，即使返回了null,组件的生命周期任会正常执行。 


## 列表渲染 & key 

- key  
key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。 
一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key.  
当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key  
如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题   

- key 只是在兄弟节点之间必须唯一,不是全局唯一的  


## 表单  
- 受控组件 
将input textarea select等表单元素的状态维护在组件的 state中。 就是设置每个value跟着一个处理函数从新setState新的value值。把状态维护到组件的state对象中，状态可控，称之为受控组件。

- 文件input标签 因为它的value只读属性，所以是React中的一个非受控组件


## 状态提升  

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。

- 就是通过子组件中自己的函数调用触发父组件的函数调用，通过props获取到父组件中定义的函数。通过这种方式可以在父组件中获取子组件中的数据。

- 总结  
react应用中，任何可变数据应当只有一个相对应的唯一的数据源，通常state首先添加到当前组件中，如果其他组件也需要这个state,那么可以将它提升到这些组件的最近共同父组件中。原因还是 自上而下的数据流。  


## 组合继承  

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。  

- 组件可以接收任意props,可以是基本的数据类型，react元素 ，组件或者函数（当然组件也是函数），
props.children 将子组件传递到渲染结果中  

## react哲学  
- state 代表了随时间会产生变化的数据，应当仅在实现交互时使用。所以构建应用的静态版本时，你不会用到它。  
- React 单向数据流（也叫单向绑定）的思想使得组件模块化，易于快速开发。
- 有关 props 和 state  

 1. props（“properties” 的缩写）和 state 都是普通的 JavaScript 对象。它们都是用来保存信息的，这些信息可以控制组件的渲染输出，而它们的一个重要的不同点就是：props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）。


 ## 代码分割  

 - React.lazy()  
    - 不支持服务端渲染  
    - 目的：code-splitting,代码分割，类似按需加载，渲染的时候才加载代码。
    - 作用： 能让像渲染常规组件一样处理动态引入（的组件）
    - 使用示例：  
    ```
    const OtherComponent = React.lazy(() => import('./OtherComponent'));

    function MyComponent() {
      return (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <OtherComponent />
          </Suspense>
        </div>
      );
    }
    ```
    - React.lazy参数是一个函数，函数动态调用import(),
    - 返回一个 promise, promise 需要resolve 一个default export的React组件。
    ```
    const OtherComponent = React.lazy(() => new Promise(resolve =>
      setTimeout(() =>
        resolve(
          // 模拟ES Module
          {
            // 模拟export default 
            default: function render() {
              return <div>Other Component</div>
            }
          }
        ),
        3000
      )
    ));
    ```

    - Suspense 组件中渲染lazy组件，只要promise没执行到resolve，suspense都会返回fallback中的loading。
        - fallback 属性接受任何在组件加载过程中你想展示的 React 元素
        - 你可以将 Suspense 组件置于懒加载组件之上的任何位置 
        - 也可以用一个 Suspense 组件包裹多个懒加载组件
        - React.Suspense也是一种虚拟组件,Suspense子树中只要存在还没回来的Lazy组件，就走fallback指定的内容

- 异常捕获边界（Error boundaries）  

    - 如果模块加载失败（如网络问题），它会触发一个错误。你可以通过异常捕获边界（Error boundaries）技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。  

    - 错误边界是 React 组件 ,它可以 在子组件树的任何位置捕获 JavaScript 错误，记录这些错误，并显示一个备用 UI 
    - 错误边界无法捕获以下场景中产生的错误：
      1. 事件处理
      2. 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
      3. 服务端渲染 
      4. 它自身抛出来的错误


- 基于路由的代码分割  

    - 也是基于React.lazy 结合 React Router配置路由代码分割  
```
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

*注意 React.lazy()只支持默认导出 default export*


## Context  

Context 提供了一个无需为每层组件手动添加props,就能在组件树间进行数据传递的方法。 

- 干嘛用的？   
Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
- 如何使用  
    1. 在顶层组将中声明一个 context,使用 React.createContext()方法
    2. 在组件外层包裹 Provider，无论多深，任何组件都能读取这个值
    3. 指定 contextType读取当前的context,React 会往上找到最近的 theme Provider，然后使用它的值
    ```
    const ThemeContext = React.createContext('light');

    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>

    // 使用 
    class ThemedButton extends React.Component {
      static contextType = ThemeContext;
      render() {
        return <Button theme={this.context} />;
      }
    }
    ```
- Context使用场景  
Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。

*像是一个生产消费模式*

- API  
    - React.createContext 创建一个context对象，当react渲染这个context对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。  
        - 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
    
    - Context.Provider 
        - 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。 
        - Provider 接收一个 value 属性，传递给消费组件。
        - 一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
        - 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
        - Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数

    - Class.contextType
        - 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象
        - 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

    - Context.Consumer
        - 这个方法提供在函数式组件中完成订阅 context


## 错误边界  

- 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。
- 错误边界是个组件  class组件 只有 class 组件才可以成为错误边界组件
- 错误边界仅可以捕获其子组件的错误，错误边界仅可以捕获其子组件的错误
- 错误边界的工作方式类似于 JavaScript 的 catch {}


## refs 转发  

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。  

React.createRef 创建了一个 React ref 
- React.forwardRef  创建组件，返回一个组件，参数是个函数型组件，一般函数型组件只能接收一个props参数，使用 React.forwardRef 这个函数型组件的第二个参数是传递的ref, 这个ref参数可以传递到子组件的 ref 属性值。通过使用 ref.current 访问到组件或者dom元素  
- props对象中的prop属性，会传递到子组件，但是 也有例外，key ref 等jsx属性不会当做props的属性，被React做了特殊处理  
- 高阶组件 refs转发？？？

## Fragments  

React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。 
- 主要解决 因为react的机制，组件返回的 jsx 最外层只能有一个根元素，而有时候我们返回的是一些兄弟节点 如 li元素的 数组集合，这个时候又不能在外层添加一个 div，这个时候React.Fragments就可以用了 
- 好处在dom渲染的时候不会添加到dom树上  用法如下
- 注意短语法 不能使用 key 和属性
- 使用 React.Fragment显示语法 key 是唯一可以传递给 Fragment 的属性
```
<React.Fragment>
  <td>Hello</td>
  <td>World</td>
</React.Fragment>
// 或者使用下面的短语法
<>
  <td>Hello</td>
  <td>World</td>
</>
```

## 高阶组件   HOC

*概念*  
高阶组件是参数为组件，返回值为新组件的函数。 相当于一个组件的装饰器  

组件是 React 中代码复用的基本单元 

*注意事项*  
- 不要在 render 方法中使用 HOC 
    - 性能问题
    - 重新挂载组件会导致该组件及其所有子组件的状态丢失
- Refs 不会被传递
    - 因为 ref 实际上并不是一个 prop - 就像 key 一样，它是由 React 专门处理的。如果将 ref 添加到 HOC 的返回组件中，则 ref 引用指向容器组件，而不是被包装组件。


## 与第三方库协同

- jquery backbone  

## 深入了解 jsx

实际上，JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。  
```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
会编译为
```
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
- 如果没有子节点，你还可以使用自闭合的标签形式

**指定 React 元素类型**
- JSX 标签的第一部分指定了 React 元素的类型。

  大写字母开头的 JSX 标签意味着它们是 React 组件。这些标签会被编译为对命名变量的直接引用，所以，当你使用 JSX <Foo /> 表达式时，Foo 必须包含在作用域内。

- React 必须在作用域内  
  由于 JSX 会编译为 React.createElement 调用形式，所以 React 库也必须包含在 JSX 代码作用域内。

- 在 JSX 类型中使用点语法
  在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便。导出的是个对象

- 用户定义的组件必须以大写字母开头  
  React.createElement()在调用这个方法时，小写开头的组件，被当成字符串处理，html标签，大写开头 当做变量处理

- 在运行时选择类型 

    - JSX 类型不能是一个表达式

- JSX 中的 Props
    - JavaScript 表达式作为 Props
    - 字符串字面量赋值给 prop。 当你将字符串字面量赋值给 prop 时，它的值是未转义的
    - Props 默认值为 “True”
    - 属性展开 展开运算符 ... 来在 JSX 中传递整个 props 对象
    ```
    <Greeting {...props} />
    ```


- JSX 中的子元素

  包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 props.children 传递给外层组件  

  有几种不同的方法来传递子元素：
  - 字符串字面量
  - JSX 子元素 
  - 函数作为子元素  
  你可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象
  - 布尔类型、Null 以及 Undefined 将会忽略  
    1. false, null, undefined, and true 是合法的子元素。但它们并不会被渲染  
    2. 值得注意的是有一些 “falsy” 值，如数字 0，仍然会被 React 渲染
    3. 在使用 && 时候，要保证 &&之前的表达式总是布尔值


## Optimizing Performance 性能优化  

- 虚拟化长列表  
  如果你的应用渲染了长列表（上百甚至上千的数据），我们推荐使用“虚拟滚动”技术。这项技术会在有限的时间内仅渲染有限的内容，并奇迹般地降低重新渲染组件消耗的时间，以及创建 DOM 节点的数量。   

  eact-window 和 react-virtualized 是热门的虚拟滚动库。 它们提供了多种可复用的组件，用于展示列表、网格和表格数据。 如果你想要一些针对你的应用做定制优化，你也可以创建你自己的虚拟滚动组件，就像 Twitter 所做的。

- shouldComponentUpdate  
  react声明周期函数，默认返回true，参数有2个，第一个是nextProps，第二个是nextState, 在render函数前执行，返回false的话跳过整个渲染过程，不执行render函数  

- React.PureComponent 来代替手写 shouldComponentUpdate,React.PureComponent是进行的浅比较，比如一个数组，使用push方法增加数组元素，这个时候继承自React.PureComponent的组件不会更新，因为React.PureComponent内部实现原理是浅比较。
- 在setState的时候，改变数据，需要设置一个新的数据，而不是使用原有的数据，


## Portal （再看下需要）
子节点渲染到存在于父组件以外的 DOM 节点


## Profiler （未看）
测量react应用的快慢  

## 不使用 JSX 的 React  

每个 JSX 元素只是调用 React.createElement(component, props, ...children) 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。React 并不强制要求使用 JSX。  

在一个项目中，和多人合作开发是最好使用同一的规范，jsx是不做的选择。





# API REFERENCE   

## React.Component 

React组件可以有 函数组件 class组件，class组件需要继承React.Component, 

**组件的生命周期**  
*render*   
- render()方法是class组件中唯一必须实现的方法。当render被调用时，它会检查this.props和this.state的变化 返回以下类型之一： 
  - React元素。
  - 数组或 fragments.使得render方法可以返回多个元素 
  - Protals ?? 
  - 字符串或者数值类型
  - 布尔类型或null 什么都不渲染。多用于短路操作  

- render为纯函数 

*constructor*  
如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数.在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)  

- 调用构造函数目的  
    - 给 this.state赋初始值，初始化内部state 
    - 为事件处理函数绑定到实例上（也可以通过箭头函数绑定）  

-  注意事项
    - 不要调用 setState() 方法 
    - 避免在构造函数中引入任何副作用或订阅

*componentDidMount*

会在组件挂载后（插入 DOM 树中）立即调用依赖于 DOM 节点的初始化应该放在这里
- 发送异步数据请求
- 执行 setState 
- 订阅  记得在 componentWillUnMount里取消
- 一下dom相关副作用 

*componentDidUpdate*  
```
componentDidUpdate(preProps,preState,snapshot)
```
- 被调用的时机  
    - 页面更新后立即调用
    - 首次渲染不会执行此方法  
- 使用时候的注意点  
    - 执行内容必须放在条件里面，否则会陷入死循环
    - 如果组件实现了 getSnapshotBeforeUpdate() 生命周期，则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。


*componentWillUnMount*  
在组件销毁卸载之前调用。此方法必须执行必要的清除工作，
- 如清除定时器
- 取消订阅
- 在这个周期函数中不要执行 this.setState  

*shouldComponentUpdate*  
```
shouldComponentUpdate(nextProps, nextState)
```
- 当state props更改，就会执行，返回值默认是true, 组件会根据这个返回值觉得是否执行render方法，默认是执行的 
- 在render函数之前调用，
- 有特殊情况，在首次渲染和使用forceUpdate()时不会调用  
- 所以这个方法可以做一些性能优化
- 通过返回false阻止更新  
- 不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。


*static  getDerivedStateFromProps()*  
```
static getDeriveddStateFromProps(props,state)
```
- 这个作用是什么，目的是做什么？

- 执行的时机
    - render方法之前调用
    - 初始挂载和后续更新时都会调用
- 返回值，返回一个对象来更新state,返回null不更新

- 谨慎使用，


*getSnapshotBeforeUpdate()* 
```
getSnapshotBeforeUpdate(prevProps, prevState)
```
- Snapshot 快照  
- getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用
- 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
- 使用场景 可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程
- 应返回 snapshot 的值（或 null）

**错误边界组件**

Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。  

- 错误边界组件 目前来看只能是class组件  
- 特有的周期函数有：
    - static getDerivedStateFromError()
        - 会在渲染阶段调用， 因此不允许出现副作用
        - 此生命周期会在后代组件抛出错误后被调用
        - 它将抛出的错误作为参数，并返回一个值以更新
    - componentDidCatch()
        - componentDidCatch(error, info)
        - 此生命周期在后代组件抛出错误后被调用
    - 以上出现一个就是个错误边界组件。

*以上都是生命周期方法，React主动调用*

**其他API**  
自己主动调用的实例方法只有两个  
- setState()
- forceUpdate()
    - 调用 forceUpdate() 将致使组件调用 render() 方法，此操作会跳过该组件的 shouldComponentUpdate()
    - 如果 render() 方法依赖于其他数据，则可以调用 forceUpdate() 强制让组件重新渲染。


**class属性**
- defaultProps
    - defaultProps 可以为 Class 组件添加默认 props。这一般用于 props 未赋值，但又不能为 null 的情况。

- displayName 
    - displayName 字符串多用于调试消息。通常，你不需要设置它，因为它可以根据函数组件或 class 组件的名称推断出来


**state props实例属性**


*额外的问题*  
- 为什么 props 复制给 state 会产生 bug？



