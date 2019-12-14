## class语法  

### constructor方法  
- 类的默认方法， 在使用new关键字生成实例时，自动调用这个方法
- 每个类必须要constructor构造方法，如果没有显示定义，一个空的constructor方法被默认添加
- construtor方法默认返回实例对象，也可以指定一个返回对象，默认不会这么做

### 类的实例  
- 实例的属性显示的定义在本身上（定义在this对象上），没有显示定义在this对象上就是在原型上（定义在class中）



## class的继承  
- 通过extends实现继承 
- 子类的constructor方法如果显示添加，必须在constructor中调用super()，而且是放在constructor方法的最上方，或者说super方法调用前，不能使用this,
- 父类的静态方法也会被子类继承
- super关键字  
  - 可以当做函数使用，当函数使用调用时代表父类的构造函数，但是返回的是子类的实例，作为函数调用时，只能在子类的constructor中调用
  - 当做对象使用时，在子类方法中，super指向父类的原型对象，在静态方法中 super指向父类


- 与ES5继承的区别
  es5继承是先创造子类的实例对象this,然后将父类的方法添加到this上。  
  es6继承是先将父类的实例对象的属性和方法添加到this上(所以必须先调用super方法)，然后在用子类的构造函数修改this