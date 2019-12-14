/**
 * 网站性能优化： 
 * 
 * 1、 网络请求方面
 *  - 减少http请求
 *    - js 代码合并到单个js文件 css 合并  css 精灵图
 *  - 使用cdn 内容分发网络， 缩短响应时间，其次使用静态文件在cdn 域名不同，增加http请求的并发量
 * 
 *  - 利用http缓存策略，添加expires头 指定一个事件，为改资源的过期时间，这个是http1版本的响应头
 *  - Cache-control http1.1 字段 搭配max-age指定资源缓存多久， expires Catche-control为强缓存
 *  
 *  - 协商缓存  if-modify-sence   etag
 *  - accept-Encoding gzip 请求压缩  在响应中设置 Content-Encoding:gzip 压缩响应
 *  - 减少DNS查找，
 *  - 避免重定向
 * 
 * 2、 代码层面
 *  - 静态资源压缩，http响应包减小，传输时间减少
 *  - 将css 样式表放在head中
 *  - 将js脚本放在底部
 *  - 避免使用css表达式
 *  - 使用外部 js  css
 *  - 精简javascript代码 删除不必要的字符及代码
 *  - 删除重复脚本
 *  - spa页面 路由懒加载
 * */ 