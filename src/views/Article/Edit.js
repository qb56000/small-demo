import React, { Component, createRef } from "react";
import {
  Card,
  Button,
  Form,
  Input,
  Checkbox,
  DatePicker,
  message,
  Spin,
} from "antd";
import { withRouter } from "react-router-dom";
import E from "wangeditor";
import "./Edit.less";
import { getArticle } from "../../requests/index";
import moment from "moment";
import { modifyArticle } from "../../requests/index";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};
const dateFormat = "YYYY/MM/DD";
const tailLayout = {
  wrapperCol: { offset: 1, span: 10 },
};

@withRouter
class Edit extends Component {
  constructor() {
    super();
    this.editor = createRef();
    this.formRef = createRef();
    this.state = {
      isloading: true,
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    getArticle(this.props.match.params.id)
      .then((resp) => {
        resp.createAt = moment(resp.createAt);
        console.log(resp.createAt);
        this.formRef.current.setFieldsValue(resp);
        let texteditor = new E(this.editor.current);
        texteditor.customConfig.onchange = (html) => {
          this.formRef.current.setFieldsValue({
            content: html,
          });
        };
        texteditor.create();
        texteditor.txt.html(resp.content);
      })
      .finally(() => {
        this.setState({
          isloading: false,
        });
      });
  }
  render() {
    const onFinish = (values) => {
      const data = Object.assign({}, values, {
        createAt: values.createAt.valueOf(),
      });
      console.log("Success:", data);

      modifyArticle(this.props.match.params.id, data)
        .then((resp) => {
          console.log(resp);
        })
        .catch()
        .finally(() => {
          message.success("modify successfully");
        });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    let onChange = (date, dateString) => {};

    return (
      <Card
        title="article"
        bordered={false}
        extra={<Button onClick={this.back}>back</Button>}
      >
        <Spin spinning={this.state.isloading}>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            ref={this.formRef}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Reading Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input  reading amount!",
                },
                {
                  pattern: /^[0-9]*(\.[0-9]*)?$/,
                  message: "Please input number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Date"
              name="createAt"
              rules={[
                {
                  required: true,
                  message: "Please input date",
                },
              ]}
            >
              <DatePicker onChange={onChange} dateFormat={dateFormat} />
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please input content",
                },
              ]}
            >
              <div id="editor" ref={this.editor} className="editor"></div>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    );
  }

  back = () => {
    this.props.history.push("/admin/article");
  };
}
export default Edit;
