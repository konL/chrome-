* Browser Actions可以在Manifest中设定一个默认的图标,一般情况下,Chrome会选择使用19像素的图片显示在工具栏中，但如果用户正在使用视网膜屏幕的计算机，则会选择38像素的图片显示。两种尺寸的图片并不是必须都指定.

* default_icon也不是必须指定的，如果没有指定，Chrome将使用一个默认图标。
* `seticon`
> chrome.browserAction.setIcon(details, callback)
脚本在后台不停地换图标
```
function chgIcon(index){
    if(index === undefined){
        index = 0;
    }
    else{
        index = index%20;
    }
    chrome.browserAction.setIcon({path: {'19': 'images/icon19_'+index+'.png'}});
    chrome.browserAction.setIcon({path: {'38': 'images/icon38_'+index+'.png'}});
    setTimeout(function(){chgIcon(index+1)},50);
}

chgIcon();
```
