/**
 * BFC block formatting context 格式化上下文，
 * ： float 绝对定位元素、非块级盒子元素（如 inline-block table-cells table-captions）以及overflow的值不为visible为其内容
 *    创建新的块格式上下文
 *  formatting context：
 *    是页面中一块渲染区域，并且有一套渲染规则，决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
 * 
 * BFC布局规则:
 *  - BFC内，盒子依次垂直排列
 *  - BFC内，两个盒子的垂直距离由margin属性决定。属于同一个BFC的两个相邻的Box的margin会发生重叠。
 *  - BFC内，每个盒子 的左外边缘接触内部盒子的左边缘
 *  - BFC的区域不会与float 盒子重叠
 *  - BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也是如此。
 *  - 计算BFC的高度时，浮动元素也参与计算。
 * 
 * 如何创建BFC:
 *  - 根元素
 *  - 浮动元素
 *  - position 为absolute 或者 fixed
 *  - overflow不为visible的块元素
 *  - display为 inline-block  table-cell  table-caption
 * 
 * */ 