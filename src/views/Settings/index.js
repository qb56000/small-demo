import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { Upload, message, Button,Card,Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { avatarUpload } from '../../requests';
import {avatarUpdate} from '../../actions/user'
const mapToState=state=>{
    return {
        avatar:state.user.avatar
    }
}



@connect(mapToState,{avatarUpdate})
class index extends Component {
  
    constructor(){
        super()
        this.state={
            isLoading:false
        }
    }
    customRequest(info){
        this.setState({
            isLoading:true
        })
        avatarUpload(info.file).then(resp=>{
            console.log(resp)
            this.setState({
                isLoading:false
            })
            this.props.avatarUpdate(resp.data.linkurl)
        })
    
}
// handleUploadAvatar = ({ file }) => {
//     const data = new FormData()
//     data.append('Token', '7e4d1275ab9f4648839ecafb9c76f6d145679944:dG0wb_MqU3lCKuTzpYYr1igeWdg=:eyJkZWFkbGluZSI6MTU4NjY2NTE2NiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzE1OTI4IiwiYWlkIjoiMTY3OTY2MSIsImZyb20iOiJmaWxlIn0=')
//     data.append('file', file)
//     this.setState({
//       isUploading: true
//     })
//     axios.post('http://up.imgapi.com/', data)
//       .then(resp => {
//         if (resp.status === 200) {
//             console.log("success")
//           this.setState({
//             isUploading: false
//           })
//           this.props.changeAvatar(resp.data.linkurl)
//         } else {
//           // 自行处理错误
//         }
//       })
//       .catch(error => {
//         // 自行处理错误
//       })
//   }











//     onChange(info) {
//         // if (info.file.status !== 'uploading') {
//         //   console.log(info.file, info.fileList);
//         // }
//         // if (info.file.status === 'done') {
//         //   message.success(`${info.file.name} file uploaded successfully`);
//         // } else if (info.file.status === 'error') {
//         //   message.error(`${info.file.name} file upload failed.`);
//         // }
//         const {file}=info
// //  console.log(file)
// avatarUpload(file).then(resp=>{
//     console.log(resp)
// })







      
    
    render() {
        console.log(this.state.isLoading)

        return (
            <Card
            title="个人设置"
            bordered={false}
          >
            <Upload
              style={{
                border: '1px dashed #dedede',
                width: 80,
                height: 80,
                display: 'block'
              }}
              showUploadList={false}
              customRequest={this.customRequest.bind(this)}
            >
          
            <Spin spinning={this.state.isLoading}>
             {this.props.avatar?<img src={this.props.avatar}></img>:<span>点击上传</span>} 
              </Spin>
                
            </Upload>
          </Card>
        )
    }
}

export default index




// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };