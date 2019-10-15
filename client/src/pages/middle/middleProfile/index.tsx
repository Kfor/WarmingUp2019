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
    title: 'ka',
    dataIndex: 'ka',
    key: 'ka',
  },
  {
    title: 'kb',
    dataIndex: 'kb',
    key: 'kb',
  },
  {
    title: 'kc',
    dataIndex: 'kc',
    key: 'kc',
  },
  {
    title: 'amount',
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
class MiddleProfile extends Component<
  MiddleProfileProps,
  MiddleProfileState
> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'middleMiddleProfile/fetchBasic',
      payload: {userId:this.props.location.query.userId}
    });
  }

  render() {
    const { middleMiddleProfile, loading } = this.props;
    const { userInfo } = middleMiddleProfile;
    
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions title="基础信息" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="组号及身份">{userInfo.userId}中游</Descriptions.Item>
            <Descriptions.Item label="现金数目">{userInfo.currency}</Descriptions.Item>
            <Descriptions.Item label="贷款总额">{userInfo.loan}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="生产能力" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="D">{userInfo.D}</Descriptions.Item>
            <Descriptions.Item label="DCost">{userInfo.DCost}</Descriptions.Item>
            <Descriptions.Item label="K">{userInfo.K}</Descriptions.Item>
            <Descriptions.Item label="KCost">{userInfo.KCost}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="已有库存" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="chip1Num">{userInfo.chip1Num}</Descriptions.Item>
            <Descriptions.Item label="chip2Num">{userInfo.chip2Num}</Descriptions.Item>
            <Descriptions.Item label="chip3Num">{userInfo.chip3Num}</Descriptions.Item>
            <Descriptions.Item label="累积库存费用">{userInfo.totalStorageCost}</Descriptions.Item>
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
