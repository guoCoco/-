<style>
    .inner {
        width: 100px;
        height: 100px;
        float: left;
    }
</style>
<div class='outer'>
    <div class='inner'></div>
    <div class='inner'></div>
    <div class='inner'></div>
</div>

1. 让父元素变成BFC元素
2. 添加伪类 clear: both;