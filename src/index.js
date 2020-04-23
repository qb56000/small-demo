import React from 'react'
import {render } from 'react-dom'
import App from './App'
import './index.less'
import {mainRouter} from './routers'
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
render(
    <Provider store={store} basename={process.env.PUBLIC_URL}>
    <Router>
        <Switch>
            <Route path='/admin' render={(routerPropers)=>{
                return <App {...routerPropers}></App>
            }} ></Route>

            {
                mainRouter.map(route=>{
                    return <Route key={ route.pathname} path={route.pathname} component={route.component}></Route>
            })
            }
            <Redirect to="/admin" from='/' exact></Redirect>
{/* 
            <Redirect to="/404" ></Redirect> */}


        </Switch>
    </Router>    
    </Provider>
    ,
document.querySelector("#root")
)

// import {render } from 'react-dom'

// import {render} from 'react-dom'
// import React from 'react'

// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

// const NormalLoginForm = () => {
//   const onFinish = values => {
//     console.log('Received values of form: ', values);
//   };

//   return (
//     <Form
//       name="normal_login"
//       className="login-form"
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//     >
//       <Form.Item
//         name="username"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Username!',
//           },
//         ]}
//       >
//         <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Password!',
//           },
//         ]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           placeholder="Password"
//         />
//       </Form.Item>
//       <Form.Item>
//         <Form.Item name="remember" valuePropName="checked" noStyle>
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <a className="login-form-forgot" href="">
//           Forgot password
//         </a>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           Log in
//         </Button>
//         Or <a href="">register now!</a>
//       </Form.Item>
//     </Form>
//   );
// };



// render(<NormalLoginForm />, document.querySelector('#root'));

