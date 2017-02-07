- [x] Chrome扩展应用使用HTML渲染界面
- [x] DOM分为3个不同的部分，分别是核心 DOM、XML DOM和HTML DOM，我们主要关心的是HTML DOM.
- [x] 在JavaScript中有多种获取DOM元素的方法，常见的有`getElementById`、`getElementsByName`、
`getElementsByTagName`、`getElementsByClassName`(兼容性非常不好一般不用），分别是通过id、name、
标签名和类名获取元素。
- [x] JavaScript可以通过`getAttribute`方法读取元素的属性，通过`setAttribute`方法添加或更改元素的属
性，通过`removeAttribute`方法删除元素的属性。对于非自定义的属性，JavaScript可以直接像读取对象属性那
样读取或更改它们，
```
var imgurl = document.getElementById('my_image').src;
document.getElementById('my_another_image').src = imgurl;
// var imgurl = document.getElementById('my_image').getAttribute('src');
// document.getElementById('my_another_image').setAttribute('src', imgurl);
```
