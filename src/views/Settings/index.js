import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Upload, message, Button, Card, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { avatarUpload } from "../../requests";
import { avatarUpdate } from "../../actions/user";
const mapToState = (state) => {
  return {
    avatar: state.user.avatar,
  };
};

@connect(mapToState, { avatarUpdate })
class index extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  customRequest(info) {
    this.setState({
      isLoading: true,
    });
    avatarUpload(info.file).then((resp) => {
      console.log(resp);
      this.setState({
        isLoading: false,
      });
      this.props.avatarUpdate(resp.data.linkurl);
    });
  }

  render() {
    console.log(this.state.isLoading);

    return (
      <Card title="个人设置" bordered={false}>
        <Upload
          style={{
            border: "1px dashed #dedede",
            width: 80,
            height: 80,
            display: "block",
          }}
          showUploadList={false}
          customRequest={this.customRequest.bind(this)}
        >
          <Spin spinning={this.state.isLoading}>
            {this.props.avatar ? (
              <img src={this.props.avatar}></img>
            ) : (
              <span>点击上传</span>
            )}
          </Spin>
        </Upload>
      </Card>
    );
  }
}

export default index;

// handleUploadAvatar = ({ file }) => {
//     const data = new FormData()
//     data.append('Token', process.env.REACT_APP_PIC)
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
