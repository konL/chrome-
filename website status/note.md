### background
在`Manifest`中指定`background`域可以使扩展常驻后台。background可以包含三种属性，分别是`scripts`、`page`和`persistent`。
* 指定了`scripts`属性，则Chrome会在扩展启动时自动创建一个`包含所有指定脚本`的页面；
* 指定了`page`属性，则Chrome会将`指定的HTML文件`作为后台页面运行。
* 通常我们只需要使用`scripts`属性即可，除非在后台页面中需要构建特殊的HTML——但一般情况下后台页面的HTML我们是看不到的。
* `persistent`属性定义了`常驻后台的方式`
> ——当其值为true时，表示扩展将一直在后台运行，无论其是否正在工作；当其值为false时，表示扩展在后台按需运行，这就是Chrome后来提出的Event Page。

>Event Page可以有效减小扩展对内存的消耗，如非必要，请将persistent设置为false。persistent的默认值为true。

### 实践
下面我们来编写一款实时监视网站在线状态的扩展。思路很简单，每隔5秒就发起一次连接请求，如果请求成功就代表网站在线，将扩展图标显示为绿色，如果请求失败就代表网站不在线，将扩展图标显示为红色。
* scripts,permissions都为数组
manifest.json
```
{
	"manifest_version":2,
	"name":"google在线状态",
	"version":"1.0",
	"description":"监视google·是否在线",
	  "icons": {
        "16": "images/icon16.png",
        "48": "images/icon48.png",
        "128": "images/icon128.png"
    },
    "browser_action": {
        "default_icon": {
            "19": "images/icon19.png",
            "38": "images/icon38.png"
        }
    },
    "background":{
    	"scripts":[
    	    "js/status.js"
    	]
    },
    "permissions":[
        "http://www.google.cn/"
        ]
}
```
ststus.js
```
function httpRequest(url,callback){
	var xhr=new XMLHttpRequest();
	xhr.open("GET",url,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			callback(true);
		}

	}
	
	xhr.onerror=function(){
		callback(false);

	}
	xhr.send();
}

setInterval(function(){
	//调用上面的函数
	httpRequest('http://www.google.cn/',function(status){
		chrome.browserAction.setIcon({
			path:'images/'+(status?'oline.png':'offline.png')//true或false
			setTimeout(checkStatus, 5000);
		});
	})
},5000);
```
* `chrome.browserAction.setIcon`
这个方法的作用就是更换扩展在浏览器工具栏中的图标。
* 使用 onerror 事件是一种老式的标准的在网页中捕获 Javascript 错误的法方。
* 如果需要利用 onerror 事件，就必须创建一个处理错误的函数。你可以把这个函数叫作 onerror 事件处理器 (onerror event handler)。这个事件处理器使用三个参数来调用：msg（错误消息）、url（发生错误的页面的 url）、line（发生错误的代码行）。
* 浏览器是否显示标准的错误消息，取决于 onerror 的返回值。如果返回值为 false，则在控制台 (JavaScript console) 中显示错误消息。反之则不会。
