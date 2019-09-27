import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';



@connect(({ profileBasic2Js, loading }) => ({
  profileBasic2Js,
  loading: loading.effects['profileBasic2Js/fetchBasic'],
}))
class Basic2js extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileBasic2Js/fetchBasic',
    });
  }

  

  render() {
    const { profileBasic2Js, loading } = this.props;
    console.log( 'aaa', profileBasic2Js )
    const { basicGoods, basicProgress, basicPhones } = profileBasic2Js;
    let phonesData = [
      {
        id: '1',
        chip: 'A芯片',
        A: '此处显示美观值',
        B: '此处显示功能值',
        // cost:'此处显示成本',
        num: '780',
        price: '200',
        amount: '15600',
      },
      {
        id: '2',
        chip: 'C芯片',
        A: '此处显示美观值',
        B: '此处显示功能值',
        // cost: '此处显示成本吗？难、多>27',
        num: '211',
        price: '2000',
        amount: '42200',
      },
      {
        id: '3',
        chip: 'A芯片',
        A: '此处显示美观值',
        B: '此处显示功能值',
        // cost: '此处显示成本吗，难',
        num: '982',
        price: '1000',
        amount: '982000',
      },
    ];

    

    // if (basicPhones.length) {
    //   let num = 0;
    //   let amount = 0;
    //   basicPhones.forEach(item => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
      // phonesData = basicPhones.concat({
    //     id: '总计',
    //     num,
    //     amount,
    //   });
    // }
    // phonesData = basicPhones;

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };

      if (index === phonesData.length) {
        obj.props.colSpan = 0;
      }

      return obj;
    };

    const phonesColumns = [
      {
        title: '手机编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < phonesData.length) {
            return <a href="">{text}</a>;
          }

          return {
            children: (
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                总计
              </span>
            ),
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '芯片种类（决定性能）',
        dataIndex: 'chip',
        key: 'chip',
        render: renderContent,
      },
      {
        title: '美观值',
        dataIndex: 'A',
        key: 'A',
        render: renderContent,
      },
      {
        title: '功能值',
        dataIndex: 'B',
        key: 'B',
        // align: 'B',
        render: renderContent,
      },

      {
        title: '单件成本',
        dataIndex: 'price',
        key: 'price',
        // align: 'B',
        render: renderContent,
      },

      {
        title: '数量（台）',
        dataIndex: 'num',
        key: 'num',
        // align: 'right',
        // render: (text, row, index) => {
        //   if (index < basicPhones.length) {
        //     return text;
        //   }

        //   return (
        //     <span
        //       style={{
        //         fontWeight: 600,
        //       }}
        //     >
        //       {text}
        //     </span>
        //   );
        // },
      },
      
      {
        title: '金额#可删去',
        dataIndex: 'amount',
        key: 'amount',
        // align: 'right',
        // render: (text, row, index) => {
        //   if (index < basicPhones.length) {
        //     return text;
        //   }

        //   return (
        //     <span
        //       style={{
        //         fontWeight: 600,
        //       }}
        //     >
        //       {text}
        //     </span>
        //   );
        // },
      },
    ];

    

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
            title="设计投入"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="总设计投入">9万</Descriptions.Item>
            <Descriptions.Item label="设计系数A">0.67</Descriptions.Item>
            {/* <Descriptions.Item label="贷款">799万</Descriptions.Item> */}
            {/* <Descriptions.Item label="子订单">3214321432</Descriptions.Item> */}
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />

          <Descriptions
            title="功能模块投入"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="总功能模块投入">19 万</Descriptions.Item>
            <Descriptions.Item label="功能模块系数B">0.87</Descriptions.Item>
            {/* <Descriptions.Item label="贷款">799万</Descriptions.Item> */}
            {/* <Descriptions.Item label="子订单">3214321432</Descriptions.Item> */}
          </Descriptions>



          {/* <Descriptions
            title="计划生产手机类型1"
            style={{
              marginBottom: 32,
            }}
          >
          </Descriptions> */}
          


          

         
          <div className={styles.title}>手机库存</div>
          <Table
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            loading={loading}
            dataSource={phonesData}
            columns={phonesColumns}
            rowKey="id"
          />
          
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic2js;
