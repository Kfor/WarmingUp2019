import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      if (text === 'success') {
        return <Badge status="success" text="成功" />;
      }

      return <Badge status="processing" text="进行中" />;
    },
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({ profileBasic1Js, loading }) => ({
  profileBasic1Js,
  loading: loading.effects['profileBasic1Js/fetchBasic'],
}))
class Basic1js extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileBasic1Js/fetchBasic',
    });
  }

  render() {
    const { profileBasic1Js, loading } = this.props;
    const { basicGoods, basicProgress } = profileBasic1Js;
    let goodsData = [];

    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };

      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }

      return obj;
    };

    
      

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions
            title="公司资金"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="总资金">999万</Descriptions.Item>
            <Descriptions.Item label="现金">200万</Descriptions.Item>
            <Descriptions.Item label="贷款">799万</Descriptions.Item>
            {/* <Descriptions.Item label="子订单">3214321432</Descriptions.Item> */}
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          <Descriptions
            title="公司存货"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="A芯片">7456</Descriptions.Item>
            <Descriptions.Item label="B芯片">886</Descriptions.Item>
            <Descriptions.Item label="C芯片">7422</Descriptions.Item>
            {/* <Descriptions.Item label="取货地址">浙江省杭州市西湖区万塘路18号</Descriptions.Item> */}
            {/* <Descriptions.Item label="备注">无</Descriptions.Item> */}
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          <Descriptions
            title="科研投入"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="总科研投入">9万</Descriptions.Item>
            <Descriptions.Item label="科研系数T">0.67</Descriptions.Item>
            {/* <Descriptions.Item label="贷款">799万</Descriptions.Item> */}
            {/* <Descriptions.Item label="子订单">3214321432</Descriptions.Item> */}
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          <Descriptions
            title="生产技术投入"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="总生产技术投入">19万</Descriptions.Item>
            <Descriptions.Item label="生产技术系数M">0.87</Descriptions.Item>
            {/* <Descriptions.Item label="贷款">799万</Descriptions.Item> */}
            {/* <Descriptions.Item label="子订单">3214321432</Descriptions.Item> */}
          </Descriptions>
          


          {/* <div className={styles.title}>退货商品</div>
          <Table
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          /> */}

          {/* <div className={styles.title}>退货进度</div>
          <Table
            style={{
              marginBottom: 16,
            }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          /> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic1js;
