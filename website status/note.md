### background
在`Manifest`中指定`background`域可以使扩展常驻后台。background可以包含三种属性，分别是`scripts`、`page`和`persistent`。
* 指定了`scripts`属性，则Chrome会在扩展启动时自动创建一个`包含所有指定脚本`的页面；
* 指定了`page`属性，则Chrome会将`指定的HTML文件`作为后台页面运行。
* 通常我们只需要使用`scripts`属性即可，除非在后台页面中需要构建特殊的HTML——但一般情况下后台页面的HTML我们是看不到的。
* `persistent`属性定义了常驻后台的方式——当其值为true时，表示扩展将一直在后台运行，无论其是否正在工作；当其值为false时，表示扩展在后台按需运行，这就是Chrome后来提出的Event Page。Event Page可以有效减小扩展对内存的消耗，如非必要，请将persistent设置为false。persistent的默认值为true。
