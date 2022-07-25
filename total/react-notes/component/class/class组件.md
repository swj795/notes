# class组件

当class组件必须有个render()函数，其他方法可选

## 组件的生命周期

![image-20211118151833632](C:\Users\lyh\AppData\Roaming\Typora\typora-user-images\image-20211118151833632.png)

```js
// 挂载时，生命周期调用顺序
constructor()
static getDerivedStateFromProps()
render()
componentDidMount()
```

### constructor()

**如果不初始化state或者不进行方法绑定，那么不需要为React组件实现构造函数**

构造函数仅用于以下俩种情况



### render（）

render被调用时，会检查this.props和this.state的变化并返回以下类型

1、React元素    通过JSX创建 例如<div /> 会被React渲染成DOM节点

2、数组或者fragments  

fragments允许你将子列表分组，无需向DOM添加额外节点

```jsx
// fragments 用法
class Columns extends React.component {
    render(){
        return (
        	<React.Fragment>
            	<td>hello</td>
                <td>world</td>
            </React.Fragment>
        )
    }
}

// 若将React.Fragment换成div标签会报错

// 短语法 用<></>替换<React.Fragment></React.Fragment>

// 带key的Fragments
function Glossary(props){
    return (
    	<dl>
        	{props.item.map(item => (
            	<React.Fragment key={item.id}>
                	<dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            ))}
        </dl>
    )
}


```

3、portals 可以渲染子节点到不同的DOM子树

```jsx
ReactDOM.createPortal(child,container) // child 是可以渲染的react子元素 container是一个DOM元素

// 用法
render(){
    return ReactDOM.createPortal(
		this.props.children,domNode
	);
}
```

4、字符串或者数字类型 

在DOM中被渲染成文本节点

**render函数是纯函数，不修改组件的state的情况下，每次调用都返回相同的结果，并且不会直接与浏览器交互，若需交互在componentDidMount（）中执行操作**



