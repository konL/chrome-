本课总结
* 其中`name`、`version`和`manifest_version`三个字段是必选的，
另外在当前版本下`manifest_version`的值推荐为2，版本1已经被弃用。
* `icons`为扩展的图标，需要提供三种不同尺寸的图标：16*16的图标
用于扩展的favicon，在查看扩展的option页面时可以看到；48*48的图
标在扩展的管理页面可以看到；128*128的图标用于WebApp。
* 图标建议都使用png格式，因为png对透明的支持最好。要注意的是：
`icons`里的图标和`browser_action`或`page_action`里的
`default_icon`可是不一样的，`default_icon`显示在工具栏
或URL输入栏右侧，需要两个规格 19*19 38*38
* js文件要放在文件夹里，否则出不来效果（目前不知道原因是什么？？）
```
{
    "manifest_version": 2,
    "name": "我的时钟",
    "version": "1.0",
    "description": "我的第一个Chrome扩展",
    "icons": {
        "16": "images/icon16.png",
        "48": "images/icon48.png",
        "128": "images/icon128.png"
    },
    "browser_action": {
        "default_icon": {
            "19": "images/icon19.png",
            "38": "images/icon38.png"
        },
        "default_title": "我的时钟",
        "default_popup": "popup.html"
    }
}

```
`icons`定义了扩展相关图标文件的位置。
`version`的值最多可以是由三个圆点分为四段的版本号，
每段只能是数字，每段数字不能大于65535且不能以0开头
（可以是0，但不可以是0123），版本号段左侧为高位，
比如1.0.2.0版本比1.0.0.1版本更高。每次更新扩展时，
新的版本号必须比之前的版本号高。

`browser_action`指定扩展的图标放在Chrome的工具栏中，
`browser_action中`的`default_icon`属性定义了相应图
标文件的位置，`default_title`定义了当用户鼠标悬停于扩
展图标上所显示的文字，`default_popup`则定义了当用户单击
扩展图标时所显示页面的文件位置。

接下来我们开始编写popup.html。
```
<html>
<head>
<style>
* {
    margin: 0;
    padding: 0;
}

body {
    width: 200px;
    height: 100px;
}

div {
    line-height: 100px;
    font-size: 42px;
    text-align: center;
}
</style>
</head>
<body>
<div id="clock_div"></div>
<script src="js/my_clock.js"></script>
</body>
</html><html>
<head>
<style>
* {
    margin: 0;
    padding: 0;
}

body {
    width: 200px;
    height: 100px;
}

div {
    line-height: 100px;
    font-size: 42px;
    text-align: center;
}
</style>
</head>
<body>
<div id="clock_div"></div>
<script src="js/my_clock.js"></script>
</body>
</html>
```
编写网页时，body的尺寸往往不会专门给定，但对于Chrome扩展
有时这是必要的，比如此例中我们需要告诉Chrome当用户单击扩
展图标后展示一个多大的界面。

接下来我们就需要引入JavaScript处理数据并动态显示了。值得
注意的是Chrome不允许将JavaScript代码段直接内嵌入HTML文档，
所以我们需要通过外部引入的方式引用JS文件。当然inline-script
也是被禁止的，所以所有元素的事件都需要使用JavaScript代码进行
绑定，如果你没有使用一个拥有强大选择器的库（如jQuery），最好给
需要绑定事件的元素分配一个id以便进行操作。

下面来编写my_clock.js文件。

```
function my_clock(el){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=m>=10?m:('0'+m);
    s=s>=10?s:('0'+s);
    el.innerHTML = h+":"+m+":"+s;
    setTimeout(function(){my_clock(el)}, 1000);
}

var clock_div = document.getElementById('clock_div');
my_clock(clock_div);
```

在my_clock.js文件中定义一个my_clock函数用于显示时间，这个
函数包含了一个el参数，这个参数为显示时间的容器，由于在HTML
文档中我们设计在id为clock_div的div容器中显示时间，所以调用
my_clock函数时我们传入了这个容器，在js文件中用变量clock_div
表示。之后my_clock函数1000毫秒之后又会再次调用自身，这样
clock_div中显示的时间就会被更新。
