- [x] 遇到的一些问题
* 对于ID来说它就是Client端HTML元素的Identity。而Name其实要复杂的多，因为Name有很多种的用途，所以它并不能完全由ID来代替。具体用途有：

    * 用途1: `作为可与服务器交互数据的HTML元素的服务器端的标示`，比如input、select、textarea、和button等。我们可以在服务器端根据
    其Name通过Request.Params取得元素提交的值。
    * 用途2: HTML元素Input type='radio'分组，我们知道`radio button控件在同一个分组类`，check操作是mutex的，同一时间只能选中一个radio，
    这个分组就是根据相同的Name属性来实现的。
    * 用途3: `建立页面中的锚点`，我们知道<a href="URL">link</a>是获得一个页面超级链接，如果不用href属性，而改用Name
    ，如：<a name="PageBottom"></a>，我们就获得了一个页面锚点。
    * 用途4: 作为对象的Identity，如`Applet、Object、Embed`等元素。比如在Applet对象实例中，我们将使用其Name来引用该对象。
    * 用途5: 在IMG元素和MAP元素之间关联的时候，如果要定义IMG的热点区域，需要使用其属性usemap，使usemap="#name"(被关联的MAP元素的Name)。
    * 用途6: 某些特定元素的属性，如attribute，meta和param。例如为Object定义参数<PARAM NAME = "appletParameter" VALUE = "value">
    或Meta中<META NAME = "Author" CONTENT = "Dave Raggett">。
    当然HTML元素的Name属性在页面中也可以起那么一点ID的作用，因为在DHTML对象树中，我们可以使用document.getElementsByName来获取一个
    包含页面中所有指定Name元素的对象数组。Name属性还有一个问题，当我们动态创建可包含Name属性的元素时，不能简单的使用赋值element.name = "..."
    来添加其Name，而必须在创建Element时，使用document.createElement('<element name = "myName"></element>')为元素添加Name属性。这是什
    么意思啊？看http://www.cnblogs.com/birdshome/archive/2005/01/31/99562.html
   * （根据stackflow的回答猜想）icon图标必须备有证明文件，且为相应的尺寸 
   * 注意manifest]}前都不用加，
   * 上次的问题【js必须在文件夹中】猜想因为需要从某个地方引入？
   * e就是event，event是一个对象，能得属性值
   * 为什么要写 if(!e)
这个是`浏览器的差异`造成的
在IE浏览器里， `event`就是等于 `window.event`;
而在非IE浏览器中， `event` 则是通过`参数`来传递， 这里就是 `参数 e`
```
if(!e){
   // 如果e未定义，说明当前是IE浏览器 ,设置 e=window.event
   e=window.event
}
```
//其它浏览器中  e 就是 event，所以不做处理
* js解析
```
function btn_move(el, mouseLeft, mouseTop){
	//设置随机值
    var leftRnd = (Math.random()-0.5)*20;
    var topRnd = (Math.random()-0.5)*20;
    //坐标值快要大于页面宽高时的处理，让按钮重会页面中间区域
    var btnLeft = mouseLeft+(leftRnd>0?100:-100)+leftRnd;
    var btnTop = mouseTop+(topRnd>0?30:-30)+topRnd;
    btnLeft = btnLeft<100?(btnLeft+window.innerWidth-200):(btnLeft>window.innerWidth-100?btnLeft-window.innerWidth+200:btnLeft);
    btnTop =  btnTop<100?( btnTop+window.innerHeight-200):(btnTop>window.innerHeight-100?btnTop-window.innerHeight+200:btnTop);
    //改变坐标
    el.style.position = 'fixed';
    el.style.left = btnLeft+'px';
    el.style.top = btnTop+'px';
}

function over_btn(e){

if(!e){
   // 如果e未定义，说明当前是IE浏览器 ,设置 e=window.event
   e=window.event
}
//其它浏览器中  e 就是 event，所以不做处理*/
    if(!e){
        e = window.event;
    }
    btn_move(this, e.clientX, e.clientY);
}

document.getElementsByName('btnK')[0].onmouseover = over_btn; //触发事件，运行over_btn函数
```
---
* 通过Manifest中的content_scripts属性可以指定将哪些脚本何时注入到哪些页面中，当用户访问这些页面后，
相应脚本即可自动运行，从而对页面DOM进行操作。
---
* Manifest的`content_scripts`属性值为`数组`类型，数组的每个元素可以包含`matches`、`exclude_matches`、css、
js、run_at、all_frames、include_globs和exclude_globs等属性。其中
* `matches`属性定义了哪些页面会被注入脚本，
* `exclude_matches`则定义了哪些页面不会被注入脚本，
* `css`和`j`s对应要注入的样式表和JavaScript，
* `run_at`定义了`何时`进行注入，
* `all_frames`定义脚本是否会注入到`嵌入式`框架中，
* `include_globs`和`exclude_globs`则是全局`URL`匹配，
最终脚本是否会被注入由matches、exclude_matches、include_globs和exclude_globs的值共同决定。简单
的说，
* 如果URL匹配mathces值的`同时`也匹配include_globs的值，会被注入；
如果URL匹配`exclude_matches`的值或者匹配`exclude_globs`的值，则不会被注入。
* content_scripts中的脚本只是`共享`页面的DOM1，而并不共享页面内嵌JavaScript的命名空间。*也就是说，
如果当前页面中的JavaScript有一个全局变量a，content_scripts中注入的脚本也可以有一个全局变量a，两者不会相互干扰。*
当然你也无法通过content_scripts访问到页面本身内嵌JavaScript的变量和函数。

* DOM中的自定义属性不会被共享。

```
{
    "manifest_version": 2,
    "name": "永远点不到的搜索按钮",
    "version": "1.0",
    "description": "让你永远也点击不到Google的搜索按钮",
    "content_scripts": [
        {
            "matches": ["*://www.google.com/"],
            "js": ["js/cannot_touch.js"]
        }
    ]
}
```
在`content_scripts`属性中我们定义了一个匹配规则，当URL符合`*://www.google.com/`规则的时候，就将js/cannot_touch.js注入到页面中。
其中`*代表任意字符`，这样当用户访问http://www.google.com/和https://www.google.com/时就会触发脚本。
