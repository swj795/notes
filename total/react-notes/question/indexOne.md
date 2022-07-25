表单隐藏域：

隐藏域用来收集或者发送信息的不可见元素

```html
<input type='hidden' name='xxx' value='xxx' />
```

当表单提交时，隐藏域会将信息用设置的名称和值发送到服务器上



当遇到问题，使用开发者工具，判断那个接口是否根据我们的意愿执行，在Payload中一般是post请求中发送请求体的数据，Preview中发送的数据自动转换成js对象格式





组件的自定义属性根据判断外部是否传入这个值

```jsx
const Input = ({placeholder}) => {
    return <input placeholder={placeholder || '请输入'} />
}  
```

逻辑与

exprA && exprB 

表达式的值由左边的操作数决定，

（1） 表达式A 为true或者其他真值，则整体返回exprB

（2)    表达式A为false或者其他假值，则整体返回exprA 

当 && 用来表示布尔值时：

只有俩个表达式都为true才会返回true。

换句话：若表达式A返回false，那么都不会进行表达式B的判断 ，结果肯定为false

逻辑或

exprA || exprB    

（1） 表达式A 为true或者其他真值，则整体返回exprA

（2)    表达式A为false或者其他假值，则整体返回exprB（都不会进行exprB的判别）

当 || 用来表示布尔值时：

只要有一个为 true 整体返回true

换句话：若表达式A返回true ，整体必然返回true



原生的时间戳

```js
// 获取时间对象
const date = new Date()

// 转化成时间戳
const time1 = date.getTime()
const time2 = date.valueOf()
const time3 = Date.parse(date)
// 前俩个精确到毫秒 第三种只精确到秒
```

moment库

```js
// 获取时间戳(以秒为单位)
moment.format('X') // 返回值为字符串类型
moment.unix()  // 返回值为数值

// 获取时间戳(以毫秒为单位)
moment.format('x')
moment.valueOf()

// 格式化显示当前时间
moment.format('YYYY-MM-DD')

// 通过增加时间来改变原始的moment
moment().add(Number,string)
moment.add(7,'d') // 增加7天

```

http://momentjs.cn/

```js
// 当moment()结果为null，返回NAN
// 当moment()结果为undefined，返回当前时间转化成时间戳 （以毫秒为单位）
moment().valueOf()

在ant日历组件中点击x号，会清空日历，此时表单的日历会变为null 在转时间戳前处理
```



数组与字符串相互转化

```js
// 数组转字符串
1、toString()

2、join();

const a = [1,2,3,4];
const b = a.toString();
const c = a.join();
// join可以根据传入的参数将字符串分隔
// toString却不行 用toString后面可以加replace()进行分割

replace(reg|substr,newSubStr|function)
const d = b.replce(/,/gi,'-')
// /g代表全局 /i 忽略大小写

// 字符串转数组
1、split()
split('') // 将每个字符都分割出来
split(',') // 根据传入的参数进行分割

2、用扩展运算符
const str = 'hello'
const newArr = [...str];
console.log(newArr);
```



引用规范

1、第三方库

2、yqn依赖

3、绝对路径

4、相对路径

5、样式



loadsh

使用loadsh中的isNil 用来判断value是否为null



Form表单：

如果Form.item 填上内容

在onSubmit中通过参数values能获得其填写的内容



通过Form.create()包装过的组件会自带this.props.form 属性 

在子组件中可以通过解构得到props

在Form中 onSubmit 数据验证成功后的回调事件