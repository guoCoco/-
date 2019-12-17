## babel是什么？  
babel是js编译器  
## babel做什么？  
- 语法转换
- 源码转换
- 通过polyfill的方式在目标环境中添加确实的特性

## babel相关知识点  
1. 核心库 @bable/core  babel的核心模块
2. cli命令行 @babel/cli  
  babel的命令行工具，提供babel这个命令  
3. 插件  
  分为语法插件和转换插件两种，
  - 语法插件  
  这类插件只允许babel解析特定的语法，在ast转换时使用，以支持解析新语法
  - 转换插件  
  转换插件会启用相应的语法插件，就是说使用语法插件解析后，在进行转换
4. 预设preset(可以理解为一组插件的组合)  
  - 常用的预设
    - @babel/preset-env  
      将es6及以上代码转换成es5代码，内部就是一个插件列表，这个插件列表会根据配置的目标环境来生成，对代码进行编译
    - @babel/preset-flow
    - @babel/preset-react
    - @babel/preset-typescript
5. polyfill  
  如果我们使用比较低版本的浏览器，一些新的内置函数 实例方法，将无法转换，这个时候就需要polyfill了。  
  - @babel/polyfill 模块包含core-js和一个自定义的regenerator runtime模块，可以模拟完整的es6+环境。如 Array.from Array.prototype.includes等都可以进行转换了  
    如何使用：
    - 添加到全局环境  
      在入口文件中引入 import '@babel/polyfill';  
      缺点就是将整个包都引入进来，其实很多都没有用到
    - 按需引入polyfill  
      @babel/preset-env提供了一个useBuiltIns参数，设置值为usage时，就只会包含代码需要的polyfill.这个时候我们设置了corejs:3，默认corejs:2,@babel/polyfill默认安装core-js@2,2版本中不包含新特性，建议使用 core-js@3;babel 会检查所有代码，以便查找在目标环境中缺失的功能，然后仅仅把需要的 polyfill 包含进来
      npm install --save core-js@3
      ```
      presets: [
          [
              "@babel/env",
              {   
                  "useBuiltIns": "usage",
                  "corejs": 3
              }
          ]
      ]
      ```
      到这个时候，如果我们每个文件都使用class声明类，在编译转换后的代码中将会每个文件中都有_createClass 等类似的辅助函数生成。这样导致文件变大，我们不需要inject多次，这个时候我们需要@babel/plugin-transform-runtime插件，可以有效的减少包体积。
  - @babel/plugin-transform-runtime是一个可以重复使用babel注入的帮助程序，减小代码体积.@babel/            plugin-transform-runtime 需要和 @babel/runtime 配合使用。help函数就不是inject注入的了，而是从@babel/runtime引入 
  所以下载@babel/runtime 需要 --save 代码依赖
  ```
  npm install --save-dev @babel/plugin-transform-runtime
  npm install --save @babel/runtime
  ```
  添加配置
  ```
  "plugins": [
        [
            "@babel/plugin-transform-runtime"
        ]
    ]
  ```
  这个时候，如果我们使用Promise等全局方法，污染全局环境，如果我们想要避免全局污染需要如下配置
  ```
  npm install @babel/runtime-corejs3 --save
  "plugins": [
        [
            "@babel/plugin-transform-runtime",{
                "corejs": 3
            }
        ]
    ]
  ```
  这个时候编译后的代码不会直接修改Array.prototype原型上的方法，配置的corejs：3不管是实例方法还是全局方法，都不会污染全局环境

6. 预设preset 插件 plugin知识点  
  - 执行顺序  
    1. plugins 在 preset前执行
    2. 插件顺序从前往后执行
    3. preset顺序从后往前执行
  - 参数  
    plugin and preset都可以接受参数，参数结构也一样，
  - 名称
    可以使用短名称 如 @bable/plugin-xxx  可以在配置的时候使用短名称 @balel/xxx
  - preset就是一个函数 返回一个对象类似babel的配置，可以是一个简单的插件数组

7. 配置文件  
  - .babelrc  在项目根目录下创建一个名为 .babelrc 的文件：
  - babel.config.js  在项目根目录下创建一个名为 babel.config.js 的文件。
  - package.json中babel字段  
    可以将 .babelrc 中的配置信息作为 babel 键(key) 的值添加到 package.json 文件中:
  - .babelrc.js 与 .babelrc 配置相同，但是可以使用JS编写。

*注意：如果不使用插件，babel编译前后的代码是一样的，相当于什么都没做，这个时候就需要相关的插件*
