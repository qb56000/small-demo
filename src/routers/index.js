import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  Article,
  ArticleEdit,
  Notification,
  Authentication
} from "../views";
import { DashboardOutlined,OrderedListOutlined , SettingOutlined } from '@ant-design/icons';
import { Component } from "react";

export const mainRouter = [
  {
    pathname: "/login",
    component: Login
  },
  {
    pathname: "/404",
    component: NotFound
  },
  {
    pathname: "/login",
    component: Login
  }
];

export const  adminRouter=[
    {
        pathname: "/admin/dashboard",
        component: Dashboard,
        title:"Dashboard",
        isNav: true,
        icon: DashboardOutlined,
        roles:['001','002']
      },
      
      {
        pathname: "/admin/article",
        component: Article,
        title:"Article",
        exact:true,
        isNav: true,
        icon: OrderedListOutlined,
        roles:['001','002']
      },
      {
        pathname: "/admin/article/edit/:id",
        component: ArticleEdit,
        title:"ArticleEdit",
        isNav: false,
        roles:['001']

      },
      {
        pathname: "/admin/settings",
        title:"Settings",
        component: Settings,
        isNav: true,
        icon:SettingOutlined,
        roles:['001']

      },
      {
        pathname: "/admin/notifications",
        title:"Notification",
        component: Notification,
        isNav: false,
        roles:['001','002']

      },
      {
        pathname: "/admin/authentication",
        component: Authentication,
        title:"Authentication",
        isNav: false,
        roles:['001','002']
      }


]