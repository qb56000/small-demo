import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon,Dropdown, Avatar,Badge} from "antd";
import {DownOutlined,UserOutlined} from '@ant-design/icons'
import logo from "./MiLogo.png";
import "./frame.less";
import { adminRouter } from "../../routers";
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import {getNotification} from '../../actions/notification'
import {logFailed} from '../../actions/user'


const { Header, Content, Footer, Sider } = Layout;
const mapState=state=>{
  console.log(state.user)
  return {
    number:state.notifications.list.filter(ele=>!ele.hasRead).length,
    displayName:state.user.displayName,
    avatar:state.user.avatar
  }
}
@connect(mapState,{getNotification,logFailed})
@withRouter
class index extends Component {
  select = ({ key }) => {
    this.props.history.push(key);
  };
  dropDownMenuClick=({key})=>{
if(key==="/logout")
{
this.props.logFailed()
}else{
  this.props.history.push(key)

}
  }

  componentDidMount(){
    this.props.getNotification()
  }
  render() {
    const menu = (
      <Menu onClick={this.dropDownMenuClick}>
        <Menu.Item key="/React-Practice/admin/notifications">
         <Badge dot={Boolean(this.props.number)}>
         通知中心
         </Badge>
            
        </Menu.Item>
        <Menu.Item key="/React-Practice/admin/settings">
      
            个人设置
        </Menu.Item>
        <Menu.Item key="/logout">
    
            退出
        </Menu.Item>
      </Menu>
    );
    const menus = adminRouter.filter((route) => route.isNav === true);
    // console.log(this.props)
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Header className="header cus-header">
          <div className="logo">
            <img src={logo}></img>
            <span>this is test</span>
          </div>
          <div style={{display:"flex",alignItems:"center"}}>
            <Dropdown overlay={menu} trigger={['click']}>
              <Badge count={this.props.number} offset={[3,-3]}>
              <a
                onClick={(e) => e.preventDefault()}
              >
                  <Avatar size={30} src={this.props.avatar} style={{marginRight:"5px"}}/>
                {this.props.displayName} <DownOutlined />
              
              </a>
              </Badge>
            </Dropdown>
            

          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={this.props.location.pathname}
              style={{ height: "100%", borderRight: 0 }}
              onClick={this.select}
            >
              {menus.map((ele) => {
                return (
                  <Menu.Item key={ele.pathname}>
                    <ele.icon />
                    {ele.title}
                    {/* <Link to={ele.pathname} >  </Link> */}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "16px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 10,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default index;
