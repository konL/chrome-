### options_page
`options_page`属性可以为扩展指定一个选项页面。当用户在扩展图标上点击右键，选择菜单中的“选项”后，就会打开这个页面。
* 指定options_page属性后，扩展图标上的右键菜单会包含“选项”链接
* 对于网站来说，用户的设置通常保存在Cookies中，或者保存在网站服务器的数据库中。
* 对于JavaScript来说，一些数据可以保存在变量中，但如果用户重新启动浏览器，这些数据就会消失。那么如何在扩展中保存用户的设置呢？我们可以使用HTML5新增的localStorage接口。除了localStorage接口以外，还可以使用其他的储存方法。
### localStorage
HTML5新增的方法，它允许JavaScript在用户计算机硬盘上永久储存数据（除非用户主动删除）。
- [x] 限制，首先是localStorage和Cookies类似，都有域的限制，运行在不同域的JavaScript无法调用其他域localStorage的数据；
- [x] 其次是单个域在localStorage中存储数据的大小通常有限制（虽然W3C没有给出限制），对于Chrome这个限制是5MB2；
- [x] 最后localStorage只能储存字符串型的数据，无法保存数组和对象，但可以通过join、toString和JSON.stringify等方法先转换成字符串再储存。
- [x] 通过声明unlimitedStorage权限，Chrome扩展和应用可以突破这一限制。
---
**实践**
编写一个天气预报的扩展，这个扩展将提供一个选项页面供用户填写所关注的城市。

有很多网站提供天气预报的API，比如OpenWeatherMap的API。
````
{
    "manifest_version": 2,
    "name": "天气预报",
    "version": "1.0",
    "description": "查看未来两周的天气情况",
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
        "default_title": "天气预报",
        "default_popup": "popup.html"
    },
    "options_page": "options.html",
    "permissions": [
        "http://api.openweathermap.org/data/2.5/forecast?q=*"
    ]
}
```
option.html
```确定用户是否填写北京
var city = localStorage.city || 'beijing';
document.getElementById('city').value = city;
//写点击save事件
document.getElementById('save').onclick = function(){
    localStorage.city = document.getElementById('city').value;
    alert('保存成功。');
}
```
weather.js
```
//发送请求，之后调用callback函数）
function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}//该函数显示xhr。response
function showWeather(result){/
    //解析
    result = JSON.parse(result);
    var list = result.list;
    var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
    for(var i in list){
        var d = new Date(list[i].dt*1000);
        table += '<tr>';
        table += '<td>'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'</td>';
        table += '<td>'+list[i].weather[0].description+'</td>';
        table += '<td>'+Math.round(list[i].temp.min-273.15)+' °C</td>';
        table += '<td>'+Math.round(list[i].temp.max-273.15)+' °C</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('weather').innerHTML = table;
}
//确定
var city = localStorage.city;
city = city?city:'beijing';
var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+',china&lang=zh_cn';
httpRequest(url, showWeather);
