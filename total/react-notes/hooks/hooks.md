

# hooks

https://daveceddia.com/usecontext-hook/

```jsx
useState // 用来更改组件的state
useEffect // 与class组件中 componentDidMount、componentDidUpdated、componentWillUnmount生命周期具有相同 的用途 
// 调用useEffect时 完成DOM的更改后运行副函数的函数  每次在渲染后调用副函数
```

##  使用useState和class组件之间的对比

```jsx
// hook  
import React , {useState} from 'react' 

const Example = () =>{
	// count 是自定义state变量   setCount是对变量state操作的函数  0是初始值
	const [count,setCount] = useState(0)
    return (
   		<div>
        	<p>{count}</p>
            <button onClick={()=>this.setCount(count + 1)}>click</button>
        </div>
    )
}

// class组件
class Example extents React.componnet{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }
    render(){
        return (
        	<div>
            <p>{this.state.count}</p>
            <button onClick={()=>this.state({count:this.state.count + 1})}>click</button>
            </div>
        )
    }
}
```

## 使用useEffect操作不需要清除effect

```jsx
// hook 一般用来请求数据
// 对应的生命周期为 componentDidMount componentDidUpdate componentWillUnmount的组合
// 无需清楚的effect 网络请求 手动变更DOM 记录日志
import React , {useState,useEffect} from 'react' 

const Example = () =>{
	// count 是自定义state变量   setCount是对变量state操作的函数  0是初始值
	const [count,setCount] = useState(0);
    
    useEffect(()=>{
        document.title = `you click ${count} times`;
    });
    
    return (
   		<div>
        	<p>{count}</p>
            <button onClick={()=>this.setCount(count + 1)}>click</button>
        </div>
    )
}


// class
class Example extents React.componnet{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }
    componentDidMount() {
        document.title = `you clicked ${this.state.count} time`;
    }
    componentDidUpdate() {
        document.title = `you clicked ${this.state.count} time`;
    }
    render(){
        return (
        	<div>
            <p>{this.state.count}</p>
            <button onClick={()=>this.state({count:this.state.count + 1})}>click</button>
            </div>
        )
    }
}
```

**useEffect 是异步执行的**

## 使用useEffect操作需要清楚的effect

```jsx

import React, {useState,useEffect} from 'react';

const FrendStatus = (props)=>{
    const [ isOnline,setIsOnline] = useState(null);
    useEffect(()=>{
        function handleStatusChange(status){
            setIsOnline(status.isOnline)
        }
        
        chatAPI.subscribeToFriendStatus(props.friend.id,handleStatusChange);
        
        return function cleanup () {
            chatAPI.unsubscribeFromFriendStatus(props.friend.id,handlestatusChange)
        };
    });
    
    if(isOnline === null){
        return 'Loading'
    }
    
    return isOnline ? 'Online' : 'Offline';
}
```

## useEffect规则

在每次render之后执行

接受第二个参数来控制跳过执行，下次render后如果指定的值没有变化就不会执行

useEffect是在render之后浏览器已经渲染结束后才执行

### 不同参数类型

#### 不传参数

默认行为，每次render后都执行

```jsx
useEffect(()=>{
    console.log('useEffect with no dependency')
})
```



#### 空数组

传入第二个参数，每次render后比较数组的值变化，若没有变化，则不会执行，等同于类组件的componentDidMount

```jsx
useEffect(()=>{
    console.log('useEffect with no dependency')
},[])
```

#### 一个值的数组

第二个参数只有一个值，比较该值是否有变化，有变化就执行

```jsx
useEffect(()=>{
    console.log('useEffect with no dependency')
},[])
```

#### 多个值的数组

第二个参数有多个值，会比较每一个值，若一个不同就会执行

```jsx
useEffect(()=>{
    console.log('useEffect with no dependency')
},[id,name])
```



## useContext 

```jsx
import React from 'react'

// 首先新建一个容器来存值(MyContext) 有provider和consumer俩个属性
// Provider 可以将props传给子组件，在子组件中可以使用值
const MyContext = React.createContext()
// MyContext 返回一个对象{Provider,consumer}

function App() {
    // 用provider给子组件提供值
    return (
    	<MyContext.provider value={2}>
        	<div>
            	<Display />
            </div>
        </MyContext.provider>
    )
}

// 不使用useContext
function Display () {
    return (
    	<MyContext.consumer>
        	{value => <div>The answer is {value}</div>}
        </MyContext.consumer>
    )
}

// 使用useContext
import {useContext} from 'react'

function Display(){
    const value = useContext(MyContext);
    return (
    	<div>The answer is {value}</div>
    )
}


```

### API

React.createContext  创建一个Context对象  这个组件会从组件树种离自身最近的那个匹配的Provider中读取值

Context.Provider  每个Context对象都会返回一个Provider React 组件 允许消费组件订阅context的变化

## useReducer

```jsx
const [state,dispatch] = useReducer(reducer,initialArg,init)
```

useState的代替方案  接收形如 (state,action)=>newState 的reducer  并返回当前的state以及配套的dispatch方法 

```jsx
const initialState = {count:0}

function reducer(state,action){
    switch(action.type){
        case 'increment':
            return {count:state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            throw new Error()
    }
}

function Counter () {
    const [state,dispatch] = useReducer(reducer,initialState);
    return (
    	<>
        	Count :{state.count}
			<button onClick={()=>dispatch({type: 'increment'})}>+</button>
			<button onClick={()=>dispatch({type: 'decrement'})}>-</button>
        </>
    )
}
```

### 初始化useReducer state 的方式

```jsx
// 第一种 指定初始state,作为第二个参数直接传入
const [state,dispatch] = useReducer (
	reducer,
    {count:initialCount}
)

// 第二种 惰性初始化
// 将init函数作为useReducer的第三个参数传入 这样state将被设置为init(initialArg)

function init (initialCount) {
    return {count: initialCount }
}
function reducer(state,action) {
    switch(action.type){
        case 'increment':
            return {count:state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload); 
        default:
        	throw new Error()
    }
}

function Counter ({initialCount}){
    const [state,dispatch] = useReducer(reducer,initialCount,init);
    return (
    	<>
        	Count: {state.count}
			<button onClick={()=>dispatch({type:'reset',payload:initialCount})}>Reset</button>
			<button onClick={()=>dispatch({type:'increment'})}>+</button>
			<button onClick={()=>dispatch({type:'decrement'})}>-</button>
        </>
    )
}
```

## useCallback

```jsx
const memoizedCallback = useCallback(
	()=>{
        doSomethimg(a,b);
    },[a,b],
);
// 把回调函数及依赖数组作为参数传入useCallback 返回该回调函数的memoized版本 只有回调函数在某个依赖项改变时才会更新
// useCallback(fn,deps) 相当于 useMeno(()=>fn,deps)
```

## useMemo

```jsx
const memoizedValue = useMemo(()=>computeExpensiveValue(a,b),[a,b])

// 仅会在某个依赖项改变时才重新计算memoized值 有助于避免在每次渲染时都进行高开销的计算
// 传入useMemo的函数会在渲染期间执行  函数内部不能执行与渲染无关的操作
```

## useRef

```jsx
// useRef会返回一个对象
// 对象.current 是ref对应的dom对象

const refContainer = useRef(initialVale)

function TextInputWithFocusButton () {
    const inputEl = useRef(null);
    const onButtonClick = ()=> {
        inputEl.current.focus()
    };
    return (
    	<>
        	<input ref={inputEl} type='text' />
        	<button onClick={onButtonClick}>Focus the input</button>
        </>
    )
}


```

## useImperativeHandle

```jsx
useImperativeHandle(ref,createHandle,[deps])
// 可以使用ref时自定义暴露给父组件的实例值 


const FancyInput = (props,ref) =>{
    const inputRef = useRef();
    useImperativeHandle(ref,()=>({
        focus:()=>{
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput)
```

