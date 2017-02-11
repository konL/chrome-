需要让`扩展`中的`多个页面`之间，或者`不同扩展`的`多个页面`之间相互传输数据，
以获得彼此的状态。比如`音乐播放器扩展`，当用户鼠标点击popup页面中的音乐列表时
，popup页面应该将用户这个指令告知后台页面，之后后台页面开始播放相应的音乐。
>一个程序免不了要储存数据，对于Chrome扩展也是这样。通常Chrome扩展使用以下三种方法中
的一种来储存数据：第一种是使用HTML5的localStorage，
第二种是使用Chrome提供的存储API；第三种是使用Web SQL Database。
###Chrome存储API
* 如果储存区域指定为sync，数据可以自动同步；

* content_scripts可以直接读取数据，而不必通过background页面；

* 在隐身模式下仍然可以读出之前存储的数据；

* 读写速度更快；

* 用户数据可以以对象的类型保存。
对于第二点要进一步说明一下。
首先localStorage是基于域名的，这在前面的小节中已经提到过了。
而content_scripts是注入到用户当前浏览页面中的，如果content_scripts直接读取localStorage，
所读取到的数据是用户当前浏览页面所在域中的。
所以通常的解决办法是content_scripts通过runtime.sendMessage和background通信，
由background读写扩展所在域（通常是chrome-extension://extension-id/）的localStorage，然后再传递给content_scripts。
