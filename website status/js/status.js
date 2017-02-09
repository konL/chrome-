function httpRequest(url,callback){
	var xhr=new XMLHttpRequest();
	xhr.open("GET",url,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			callback(true);
		}

	}
	//使用 onerror 事件是一种老式的标准的在网页中捕获 Javascript 错误的法方。
	//如果需要利用 onerror 事件，就必须创建一个处理错误的函数。你可以把这个函数叫作 onerror 事件处理器 (onerror event handler)。这个事件处理器使用三个参数来调用：msg（错误消息）、url（发生错误的页面的 url）、line（发生错误的代码行）。
	//浏览器是否显示标准的错误消息，取决于 onerror 的返回值。如果返回值为 false，则在控制台 (JavaScript console) 中显示错误消息。反之则不会。
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
		});
	})
},5000);