import React, { Component } from "react";
import { Form, Input, Button, Checkbox ,Card} from "antd";
import './index.less'
import {Login} from '../../actions/user'
import {connect } from 'react-redux'
import {Redirect } from 'react-router-dom'

const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  

const mapToProps=state=>{
    return{
        isLogin: state.user.isLogin,
        isLoading:state.user.isLoading
    }
}
@connect(mapToProps,{Login})
class index extends Component {
  render() {
    const onFinish = (values) => {
        this.props.Login(values)
  
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

      return (
          this.props.isLogin?
<Redirect to="/admin"></Redirect>
:
          <Card title={"Login"} className="card">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish.bind(this)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input  disabled={this.props.isLoading} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password   disabled={this.props.isLoading}/>
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Card>
      );
    };
  }

  export default index