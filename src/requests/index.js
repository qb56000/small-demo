import axios from 'axios'
import {message} from 'antd'
import qs from 'qs'

const isDev=process.env.NODE_ENV==='development'
const service=axios.create({
    baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/248902':'',
  
})

const userInfo=axios.create({
    baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/248902':'',
  
})

service.interceptors.request.use((config)=>{
    config.data={
        ...config,
        // authToken:window.localStorage.getItem('authToken')
        authToken:'aaa'
    }
    return config
})

service.interceptors.response.use((resp)=>{
    if(resp.data.code===200){
        return resp.data.data
    }else{
        message.error(resp.data.errMsg)
    }
})



export const getArticles=(offset=0,limited=10)=>{
    return service.post('/api/v1/articleList',{
        offset,
        limited
    })
}

export const deleteArticle=(id)=>{
    // console.log(`/api/v1/delete/${id}`)
    return service.post(`/api/v1/delete/${id}`)
}


export const getArticle=(id)=>{
    return service.get(`/api/v1/article/${id}`)
}


export const modifyArticle=(id,data)=>{
    console.log("data",data)
    return service.post(`/api/v1/articleEdit/${id}`,data)
}

export const readingAmount=()=>{
    return service.get("http://rap2.taobao.org:38080/app/mock/248902/api/v1/amount")
}

export const getNotificaions=()=>{
    return service.post("http://rap2.taobao.org:38080/app/mock/248902/example/1586326916396")
}


export const loginRequest=(info)=>{
    return userInfo.post("http://rap2.taobao.org:38080/app/mock/248902/api/v1/login",info)

}


export const avatarUpload=(file)=>{
    console.log("file",file)
      const data = new FormData()
    data.append('Token', '7e4d1275ab9f4648839ecafb9c76f6d145679944:dG0wb_MqU3lCKuTzpYYr1igeWdg=:eyJkZWFkbGluZSI6MTU4NjY2NTE2NiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE1OTI4IiwiYWlkIjoiMTY3OTY2MSIsImZyb20iOiJmaWxlIn0=')
    data.append('file', file)
   return  axios.post("http://up.imgapi.com/",data)
}