import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { UserInfo } from './data.d';
import styles from './style.less';

interface MiddleProfileProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  middleMiddleProfile: UserInfo;
}
interface MiddleProfileState {
  visible: boolean;
}

const phoneColumns = [
  {
    title: '性能值ka',
    dataIndex: 'ka',
    key: 'ka',
  },
  {
    title: '美观值kb',
    dataIndex: 'kb',
    key: 'kb',
  },
  {
    title: '功能值kc',
    dataIndex: 'kc',
    key: 'kc',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',
  },
];

@connect(
  ({
    middleMiddleProfile,
    loading,
  }: {
    middleMiddleProfile: UserInfo;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    middleMiddleProfile,
    loading: loading.effects['middleMiddleProfile/fetchBasic'],
  }),
)
class MiddleProfile extends Component<MiddleProfileProps, MiddleProfileState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'middleMiddleProfile/fetchBasic',
      payload: { userId: this.props.location.query.userId },
    });
  }

  render() {
    const { middleMiddleProfile, loading } = this.props;
    const { userInfo, round } = middleMiddleProfile;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions title="基础信息" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="组号及身份">{userInfo.userId} 中游</Descriptions.Item>
            <Descriptions.Item label="现金数目">{userInfo.currency} 元</Descriptions.Item>
            <Descriptions.Item label="当前银行贷款">{userInfo.loan} 元</Descriptions.Item>
            <Descriptions.Item label="本轮银行贷款额度">{userInfo.loanMax} 元</Descriptions.Item>
            <Descriptions.Item label="当前轮次">{round}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="生产能力" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="D">{userInfo.D}</Descriptions.Item>
            <Descriptions.Item label="DCost">{userInfo.DCost} 元</Descriptions.Item>
            <Descriptions.Item label="K">{userInfo.K}</Descriptions.Item>
            <Descriptions.Item label="KCost">{userInfo.KCost} 元</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="已有库存" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="chip1Num">{userInfo.chip1Num} 个</Descriptions.Item>
            <Descriptions.Item label="chip2Num">{userInfo.chip2Num} 个</Descriptions.Item>
            <Descriptions.Item label="chip3Num">{userInfo.chip3Num} 个</Descriptions.Item>
            <Descriptions.Item label="累积库存费用">
              {userInfo.totalStorageCost} 元
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <div className={styles.title}>手机库存</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={userInfo.phoneNum}
            columns={phoneColumns}
            rowKey="id"
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default MiddleProfile;
