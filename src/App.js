import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {
    Button
} from 'antd'
import {connect} from 'react-redux'
import {Frame } from './components'
import {adminRouter} from './routers'
// const test=(Component)=>{
//     return class CopyRight extends Component{
//         render(){
//             return(
//                 <>
//                  <Component/>
//                 <div> this is test message</div>
//                 </>
//             )
//         }
//     }
// }
const mapToProps=state=>{
    return{
        isLogin: state.user.isLogin,
        role:state.user.role
    }
}
@connect(mapToProps)
class App extends Component {
    render() {
        console.log(this.props.isLogin)
        return (
            this.props.isLogin?
        <Frame>
            <Switch>
            {
                adminRouter.map(ele=>{

                    return <Route key={ele.pathname} path={ele.pathname} render={
                        (routerProps)=>{
                            console.log("ele",ele)
                            console.log("ele2",this.props.role)

                            return (ele.roles.includes(this.props.role)?<ele.component {...routerProps}/>:<Redirect to='/admin/authentication'></Redirect>)
                        }
                    } exact={ele.exact}></Route>
                })
            }
            <Redirect to={adminRouter[0].pathname} from='/admin' exact></Redirect>
            <Redirect to='/404' ></Redirect>
            </Switch>
            </Frame>
            :
            <Redirect to='/login' ></Redirect>

        )
    }
}

export default App
