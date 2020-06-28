import React, { Component } from "react";
import { Card, Button, List, Avatar, Badge, Spin } from "antd";
import { connect } from "react-redux";
import {
  markNotificationAsReadyById,
  markAllAsRead,
  getNotification,
} from "../../actions/notification";

const mapState = (state) => {
  return {
    list: state.notifications.list,
    isLoading: state.notifications.isLoading,
  };
};

@connect(mapState, {
  markNotificationAsReadyById,
  markAllAsRead,
  getNotification,
})
class index extends Component {
  componentDidMount() {
    this.props.getNotification();
  }
  render() {
    //   console.log('props',this.props)
    console.log(this.props.isLoading);
    return (
      <Card
        title="Notification"
        bordered={false}
        extra={
          <Button
            disabled={this.props.list.every((item) => item.hasRead === true)}
            onClick={this.props.markAllAsRead}
          >
            read all
          </Button>
        }
      >
        <Spin spinning={this.props.isLoading}>
          <List
            itemLayout="horizontal"
            dataSource={this.props.list}
            renderItem={(item) => (
              <List.Item
                extra={
                  item.hasRead ? null : (
                    <Button
                      onClick={this.props.markNotificationAsReadyById.bind(
                        this,
                        item.id
                      )}
                    >
                      finish
                    </Button>
                  )
                }
              >
                <List.Item.Meta
                  // avatar={
                  //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  // }
                  title={
                    <a href="https://ant.design">
                      <Badge dot={!item.hasRead}>{item.title}</Badge>
                    </a>
                  }
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Spin>
      </Card>
    );
  }
}
export default index;
