import React, { Component, createRef } from "react";
import echarts from "echarts";
import { Card, Row, Col, Divider, Spin } from "antd";
import "./dashboard.less";
import { readingAmount } from "../../requests";
export default class index extends Component {
  constructor() {
    super();
    this.amountChart = createRef();
    this.state = {
      isloading: true,
    };
  }

  initChart = () => {
    const myChart = echarts.init(this.amountChart.current);

    readingAmount()
      .then((resp) => {
        console.log("resp", resp);
        myChart.setOption({
          title: {
            text: "ECharts 入门示例",
          },
          tooltip: {},
          xAxis: {
            data: resp.amount.map((ele) => {
              return ele.month;
            }),
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: resp.amount.map((ele) => {
                return ele.value;
              }),
            },
          ],
        });
      })
      .finally(() => {
        this.setState({
          isloading: false,
        });
      });
    // 绘制图表
  };

  componentDidMount() {
    this.initChart();
  }

  render() {
    const style = { background: "#0092ff", padding: "8px 0" };

    return (
      <>
        <Card title="Dashboard" bordered={false}>
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <div style={style}>this is test placeholder</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>this is test placeholder</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>this is test placeholder</div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>this is test placeholder</div>
            </Col>
          </Row>
        </Card>
        <Card title="Reading amount" bordered={false}>
          <Spin spinning={this.state.isloading}>
            <div ref={this.amountChart} style={{ height: "400px" }}></div>
          </Spin>
        </Card>
      </>
    );
  }
}
