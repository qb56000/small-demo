import React, { Component } from "react";
import { Card, Button, Table, Tag,Modal,message ,Tooltip} from "antd";
import { getArticles } from "../../requests";
import moment from "moment";
import {deleteArticle} from '../../requests'
const ButtonGroup=Button.Group

export default class index extends Component {

  constructor() {
    super();
    this.state = {
      dataSource: [],
      columns: [],
      total: 0,
      isLoading:false,  
      offset:0,
      limited:0
    };
  }

  match = ele => {
    const list = {
      title: "标题",
      amount: "数量",
      id: "id",
      createAt: "时间",
      author: "作者"
    };
    return list[ele];
  };

  numberColor = amount => {
    if (200 < amount && amount < 230) {
      return "red";
    } else if (230 <= amount && amount <= 270) {
      return "green";
    } else {
      return "blue";
    }
  };

  onPageChange=(page,pageSize)=>{
    this.setState({
      offset:pageSize*(page-1),
      limited:pageSize
    },()=>{
      this.getData()
    })
  }

  editArticle=(id)=>{
    console.log("edit",this.props)
    this.props.history.push(`/admin/article/edit/${id}`)

  }

  getData = () => {
    this.setState({
      isLoading:true
    })
    getArticles(this.state.offset,this.state.limited).then(resp => {
      const columnsKey = Object.keys(resp.list[0]);
      const columns = columnsKey.map(ele => {
        if (ele === "amount") {
          return {
            title: this.match(ele),
            key: ele,
            render: (text, record) => {
              // console.log(text)
              // console.log(record)
              return (
               <Tooltip title="number">
                 <Tag color={this.numberColor(record.amount)}>{text.amount}</Tag>
                </Tooltip> 
              );
            }
          };
        } else if (ele === "createAt") {
          return {
            title: this.match(ele),
            key: ele,
            render: (text, record) => {
              return moment(text.createAt).format("YYYY:MM:DD hh:mm:ss");
            }
          };
        } else {
          return {
            title: this.match(ele),
            dataIndex: ele,
            key: ele
          };
        }
      });
      columns.push({
        title:'操作',
        key:'operation',
        render:(text)=>{
          return <ButtonGroup>
            <Button size='small' type='primary' onClick={()=>{this.editArticle(text.id)}}>Edit</Button>
            <Button size='small' onClick={()=>{this.deleteArticles(text.id)}}>Delete</Button>

          </ButtonGroup>
        }


      })
      if(!this.updater.isMounted(this)) return
      this.setState({
        total: resp.total,
        dataSource: resp.list,
        // isLoading:false,
        columns
      });
    }).catch((error)=>{

    }).finally(()=>{
      if(!this.updater.isMounted(this)) return
      this.setState({
        isLoading:false
      })
    }
      
    );
  };

  deleteArticles=(id)=>{
    Modal.confirm({
      title:`do you want to delete ${id}`,
      okText:'delete',
      cancelText:'cancel',
      content:'sure?',
      onOk(){
        deleteArticle(id).then(resp=>{
          console.log(resp)
        }).catch().finally(()=>{
          message.success('delete successfully')
        })
      }
  })
}

  onShowSizeChange=(current,size)=>{
    this.setState({
      offset:0,
      limited:size
    },()=>{
      this.getData()
    })
  }

 
  componentDidMount(){
    this.getData();
  }

  render() {
    console.log(this.state.total)
    return (
      <Card title="article" bordered={false} extra={<Button onClick={this.toExcel}>excel</Button>}>
        <Table
          dataSource={this.state.dataSource}
          columns={this.state.columns}
          loading={this.state.isLoading}
          pagination={{
              //  pageSize:4,
              Current:this.state.offset/this.state.limited+1,
              total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper:true,
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange,
            onChange:this.onPageChange,
            pageSizeOptions:['10','15']
    
          }}
        />
        ;
      </Card>
      // <div>
      //     article index
           // </div>
    );
  }
}
