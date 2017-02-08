[问题]

* 文中的网站已经不可用，我这里给一个。我得到的responseText是整个网页，后面得用innerHTML出来结果才正确。是不是asp和php得到的responseText就不一样？另外用innerHTML有什么问题或者有没有办法提取得到的Text中的内容？ 
* 关于使用innerHTML为何不安全？原回答：http://stackoverflow.com/questions/41421122/chrome-extension-content-script-and-xss-attacks/41445835#41445835
### Same origin bypasses (including universal XSS, aka UXSS).
>**xss 编辑**
跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。
**UXSS**
全称Universal Cross-Site Scripting，翻译过来就是通用型XSS，也叫Universal XSS。
那么，UXSS由于前面提到的几种XSS有什么区别？
不同于常见的XSS，UXSS是一种利用浏览器或者浏览器扩展漏洞来制造产生XSS的条件并执行代码的一种攻击类型。
### Privilege escalation.
特权上升(EoP)，是一种被 黑客 使用来获得对一个系统或 网络 控制的方法。远程用户首先利用某个网络程序的漏洞（通过html）获 privileg escal 利用得对计算机的普通用户访问权限，然后基于这种访问权限攻击。
### Privacy violations (e.g. referrer leaking).(泄露信息）
###跨域
http://a.example.com/a.txt 
* http协议
* a服务器名
* example。com域
* a.txt文件
`跨域`指的是`JavaScript`通过`XMLHttpReques`t请求数据时，`调用JavaScript的页面`所在的域和`被请求页面`的域不一致。
对于网站来说，浏览器出于安全考虑是不允许跨域。
另外，对于`域`相同，但`端口或协议不同`时，浏览器也是`禁止`的。：

 URL       |DESCRIPTION           | 是否允许请求  |
| ------------- |:-------------:| -----:|
|http://a.example.com/ & http://a.example.com/a.txt      |同域|允许|
|http://a.example.com/ & http://a.example.com/b/a.txt     | 同域不同目录     |    允许 |
| http://a.example.com/ & http://a.example.com:8080/a.txt | 同域不同端口      |   不允许 |
|http://a.example.com/ & https://a.example.com/a.txt |同域不同协议|不允许|
|http://a.example.com/ & http://b.example.com/a.txt |不同域 | 不允许 |
|http://a.example.com/ & http://a.foo.com/a.txt | 不同域| 不允许|

Google允许Chrome扩展应用不必受限于跨域限制。但出于安全考虑，需要在`Manifest`的`permissions`属性中声明需要跨域的权限。
如果我们想设计一款获取维基百科数据并显示在其他网页中的扩展，就要在Manifest中进行如下声明：
```
"permissions": [
        "*://*.wikipedia.org/*"
    ]
    ```
    
    ###异步请求
   * callback函数
   
   【理解】函数a执行完，callback函数b
   > A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.
    ```
    function httpRequest(url, callback){
    【新建对象】
    var xhr = new XMLHttpRequest();
    【发送请求】
    xhr.open("GET", url, true);
    【事件监听
    【readystate0-4
    readystatus状态码】
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);//获取响应
      }
    }
    xhr.send();
}
```

为什么要使用`callback`函数接收请求结果，而不直接用return将结果作为函数值返回呢？因为XMLHttpRequest不会阻塞下面代码的运行。
```
function count(n){
    var sum = 0;
    for(var i=1; i<=n; i++){
        sum += i;
    }
    return sum;
}

var c = count(5)+1;
console.log(c);
```
上面这个例子会在控制台显示16，因为count(5)=1+2+3+4+5=15，c=15+1=16。我们再看下面的例子：
```
function httpRequest(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            return xhr.responseText;
        }
    }
    xhr.send();
}

var html = httpRequest('test.txt');
console.log(html);
```
显示undefined
* 对于第一个例子，count函数是一个阻塞函数，在它没有运行完之前它会阻塞下面的代码运行，所以直到count计算结束后才将结果返回后再加1赋给变量c，最后将变量c的值打印出来。
* 而第二个例子中的httpRequest函数不是一个阻塞函数，在它没运行完之前后面的代码就已经开始运行，这样html变量在httpRequest函数没返回值之前就被赋值，所以最终的结果必然就是undefined了。

既然这样，如何将非阻塞函数的最终结果传递下去呢？方法就是使用回调函数。在Chrome扩展应用的API中，大部分函数都是非阻塞函数，所以使用回调函数传递结果的方法以后会经常用到。

下面来实战编写一款显示用户IP的扩展。
manifest.json
```
{
    "manifest_version": 2,
    "name": "查看我的IP",
    "version": "1.0",
    "description": "查看我的电脑当前的公网IP",
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
        "default_title": "查看我的IP",
        "default_popup": "popup.html"
    },
    "permissions": [
         "http://1212.ip138.com/ic.asp"//允许对url进行跨域请求
    ]
}
```
popup.html
```
<html>
<head>
<style>
* {
    margin: 0;
    padding: 0;
}

body {
    width: 400px;
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
<div id="ip_div">正在查询……</div>
<script src="js/my_ip.js"></script>
</body>
</html>
```
my_ip.js
```
function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

httpRequest('http://1212.ip138.com/ic.asp', function(ip){
    document.getElementById('ip_div').innerHTML = ip;
});
```
