### JSON
`JSON`包含两种结构：一种是`key:value`对的形式，名称和值之间用冒号（:）连接，
多个`key:value`对之间用逗号（,）连接，最后在整个对象两侧加上`“{”`和`“}”`；另一种
是`值`的有序集合，值与值之间用逗号`（,`）连接，最后在整个数组两侧加上`“[”和“]”`。
其中无论是对象形式还是数组形式，它们的值均可以是字符串、数字、`对象、数组`、布尔和null
中的一种，也就是说JSON有嵌套的性质，值也可以是JSON格式的数据。
```
[Object]
{
    "name" : "Harry Potter",
    "author" : {
        "name" : "J.K.Rowling",
        "birth" : 1964
    },
[array]
    "books" : [
        "Harry Potter and the Philosopher's Stone",
        "Harry Potter and the Chamber of Secrets",
        "Harry Potter and the Prisoner of Azkaban",
        "Harry Potter and the Goblet of Fire",
        "Harry Potter and the Order of the Phoenix",
        "Harry Potter and the Half-Blood Prince",
        "Harry Potter and the Deathly Hallows"
    ]
}
```
