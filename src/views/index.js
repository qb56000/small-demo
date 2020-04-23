// import Dashboard from './DashBoard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import Article  from './Article'
// import ArticleEdit from './Article/Edit'
import {Loading} from '../components'
import Loadable from 'react-loadable'

const  Dashboard= Loadable({
    loader: ()=>import('./DashBoard'),
    loading: Loading
})
const  NotFound= Loadable({
    loader: ()=>import('./NotFound'),
    loading: Loading
})
const  Settings= Loadable({
    loader: ()=>import('./Settings'),
    loading: Loading
})
const  Login= Loadable({
    loader: ()=>import('./Login'),
    loading: Loading
})
const  Article= Loadable({
    loader: ()=>import('./Article'),
    loading: Loading
})

const  ArticleEdit= Loadable({
    loader: ()=>import('./Article/Edit'),
    loading: Loading
})


const Notification=Loadable({
    loader: ()=>import('./Notifications'),
    loading: Loading
})

const Authentication=Loadable({
    loader: ()=>import('./Authentication'),
    loading: Loading
})



export{
    Dashboard,
    Login,
    NotFound,
    Settings,
    Article,
    ArticleEdit,
    Notification,
    Authentication
}