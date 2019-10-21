import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { UserInfo } from './data.d';
import styles from './style.less';
import user from 'mock/user';

interface UpProfileProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  upUpProfile: UserInfo;
}
interface UpProfileState {
  visible: boolean;
}

@connect(
  ({
    upUpProfile,
    loading,
  }: {
    upUpProfile: UserInfo;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    upUpProfile,
    loading: loading.effects['upUpProfile/fetchBasic'],
  }),
)
class UpProfile extends Component<UpProfileProps, UpProfileState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      //type: 'user/fetchCurrent',
      type: 'upUpProfile/fetchBasic',
      payload: { userId: this.props.location.query.userId },
    });
  }

  render() {
    const { upUpProfile, loading } = this.props;
    const { userInfo, round } = upUpProfile;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions title="基础信息" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="组号及身份">{userInfo.userId}上游</Descriptions.Item>
            <Descriptions.Item label="现金数目">{userInfo.currency}</Descriptions.Item>
            <Descriptions.Item label="贷款总额">{userInfo.loan}</Descriptions.Item>
            <Descriptions.Item label="最大贷款额度">{userInfo.loanMax} 元</Descriptions.Item>
            <Descriptions.Item label="当前轮次">{round}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="生产能力" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="M">{userInfo.M}</Descriptions.Item>
            <Descriptions.Item label="MCost">{userInfo.MCost}</Descriptions.Item>
            <Descriptions.Item label="T">{userInfo.T}</Descriptions.Item>
            <Descriptions.Item label="TCost">{userInfo.TCost}</Descriptions.Item>
            <Descriptions.Item label="chip1">{userInfo.Max1}</Descriptions.Item>
            <Descriptions.Item label="chip2">{userInfo.Max2}</Descriptions.Item>
            <Descriptions.Item label="chip3">{userInfo.Max3}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
          <Descriptions title="已有库存" style={{ marginBottom: 8 }} column={4}>
            <Descriptions.Item label="chip1Num">{userInfo.chip1Num}</Descriptions.Item>
            <Descriptions.Item label="chip2Num">{userInfo.chip2Num}</Descriptions.Item>
            <Descriptions.Item label="chip3Num">{userInfo.chip3Num}</Descriptions.Item>
            <Descriptions.Item label="累积库存费用">{userInfo.totalStorageCost}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 8 }} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UpProfile;
