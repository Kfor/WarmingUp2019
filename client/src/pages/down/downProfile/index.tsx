import { Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { UserInfo } from './data.d';

import styles from './style.less';

interface DownProfileProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  downDownProfile: UserInfo;
}
interface DownProfileState {
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
    downDownProfile,
    loading,
  }: {
    downDownProfile: UserInfo;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    downDownProfile,
    loading: loading.effects['downDownProfile/fetchBasic'],
  }),
)
class DownProfile extends Component<DownProfileProps, DownProfileState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'downDownProfile/fetchBasic',
      payload: { userId: this.props.location.query.userId },
    });
  }

  render() {
    const { downDownProfile, loading } = this.props;
    const { userInfo, round } = downDownProfile;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions title="基础信息" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="组号及身份">{userInfo.userId} 下游</Descriptions.Item>
            <Descriptions.Item label="现金数目">{userInfo.currency} 元</Descriptions.Item>
            <Descriptions.Item label="当前银行贷款">{userInfo.loan} 元</Descriptions.Item>
            <Descriptions.Item label="本轮银行贷款额度">{userInfo.loanMax} 元</Descriptions.Item>
            <Descriptions.Item label="累积库存费用">
              {userInfo.totalStorageCost} 元
            </Descriptions.Item>
            <Descriptions.Item label="当前轮次">{round}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="生产能力" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="本轮广告影响力">{userInfo.ad}</Descriptions.Item>
            <Descriptions.Item label="累积广告投入">{userInfo.adCost} 元</Descriptions.Item>
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

export default DownProfile;
