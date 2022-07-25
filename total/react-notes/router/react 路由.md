# react -router 

react router 和react-router-dom区别

react-router: 实现路由的核心功能

react-router-dom : 是基于react-router   依赖react-router 

一般来说引入react-router-dom后不需要引入react-router



react router 一般分为三种

1、路由器：<BrowserRouter />  <HashRouter />

​		通常<BrowserRouter />包裹在最外层

2、路由匹配器  <Route />  <Switch />

​		通常具体的路由放在不太具体的路由之前

​		<Switch /> 匹配到一个正确的url ，剩下的不会再匹配

3、路由导航  <Link />   <NavLink />   <Redirect /> 

这些都需要从react-router-dom中引入





## 服务端渲染（Server Rendering)

用<staticRouter /> 代替 <BrowserRouter />



## 路由配置

IndexRoute 来设置一个默认页面

```jsx
import { IndexRoute } from 'react-router'

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

React.render((
  <Router>
    <Route path="/" component={App}>
      {/* 当 url 为/时渲染 Dashboard */}
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
), document.body)
```

## switch

渲染第一个与当前地址匹配正确的子路由或者重定向

```jsx
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'

function App(){
    return (
    	<BrowserRouter>
        	<Link path='/'>home</Link>
            <link path='user' />user</Link>
        	<link path='about'></link>
        	<Switch>
            	<Route></Route>
        	</Switch>
        </BrowserRouter>
    )
}

```



## parameters

可以通过useParams hook来获取路由地址的参数



## uesRouteMatch

```jsx
let {path,url} = useRouteMatch();

// path 相对的父级路由
// url  本身路由 

```

## Redirect

```jsx
<Redirect from='home' to='dashborad' />
// from 从 home地址 跳转到 dashborad 地址
```



## API

useHistory 可以让你访问历史 

```jsx
import {useHistory} from 'react-router-dom'

const Aside = (path) => {
    let history = useHistory()
    function handleClick (){
        history.push(path)
    }
    
const routers = [
    {
        path:'/home',
        name:'home'
    },
    {
        path:'/user',
        name:'name'
    }
]
return (
	routers.map(item => {
        const {path,name} = item;
     <Component key={path} path={path} onClick={()=>{handleClick}}/>
    })
)
}
```

useLocation  返回当前页面的url，可以将它当成一个useState，页面跳转，返回最新的url

```jsx
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ga.send(["pageview", location.pathname]);
  }, [location]);
}

function App() {
  usePageViews();
  return <Switch>...</Switch>;
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  node
);
```

useParams 返回url的参数的键/值对的对象

useRouteMatch 试图用来匹配正确的url

### BrowseRouter

```jsx
// basename
<BrowseRouter basename='/calendar'>
	<Link to='/today'></Link> //<a herf='/calendar/today'></a>
</BrowseRouter>

// getUserConfirmation
<BrowseRouter getUserConfirmation={(mes,callback) =>{
        const allowTransition = window.confirm(mes);
        callback(allowTransition)
    }} />

// keyLength: number 默认为6
<BrowseRouter keyLength={12} />

```

