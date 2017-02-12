//create an object
chrome.contextMenus.create({
    'type':'normal',
    'title':'使用Baidu翻译……',
	//menu appears when text is being selected
	 'contexts':['selection'],
    'id':'cn',
	//function
	 'onclick':translate
});

function translate(info, tab){
    var url = 'http://fanyi.baidu.com/?aldtype=16047#en/zh/'+info.selectionText ;
    window.open(url,  'newwindow', 'height=200, width=1280, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
}
/*runtime.onMessage完整的方法为：

chrome.runtime.onMessage.addListener(callback)
此处的callback为必选参数，为回调函数。callback
接收到的参数有三个，分别是message、sender和sendResponse，
即消息内容、消息发送者相关信息和相应函数。*/
//use for the communication of google translate and the extension
//and update the data
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	//update方法可以动态更改菜单属性，指定需要更改菜单的id和所需要更改的属性即可
	chrome.contextMenus.update('cn',{
		'title':'translated text: '+message
	});
});