import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { DealBetweenList } from './data.d';
import styles from './style.less';

interface DealBetweenProfileProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  adminAnddealBetweenProfile: DealBetweenList;
}
interface DealBetweenProfileState {
  visible: boolean;
}
const dealBetweenColumns = [
  {
    title: 'userId1',
    dataIndex: 'userId1',
    key: 'userId1',
  },
  {
    title: 'userId2',
    dataIndex: 'userId2',
    key: 'userId2',
  },
  {
    title: 'money',
    dataIndex: 'money',
    key: 'money',
  },
  {
    title: 'returnMoney',
    dataIndex: 'returnMoney',
    key: 'returnMoney',
  },
  {
    title: 'startTurn',
    dataIndex: 'startTurn',
    key: 'startTurn',
  },
  {
    title: 'endTurn',
    dataIndex: 'endTurn',
    key: 'endTurn',
  },
];

@connect(
  ({
    adminAnddealBetweenProfile,
    loading,
  }: {
    adminAnddealBetweenProfile: DealBetweenList;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    adminAnddealBetweenProfile,
    loading: loading.effects['adminAnddealBetweenProfile/fetchBasic'],
  }),
)
class DealBetweenProfile extends Component<DealBetweenProfileProps, DealBetweenProfileState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAnddealBetweenProfile/fetchBasic',
    });
  }

  render() {
    const { adminAnddealBetweenProfile, loading } = this.props;
    const { dealBetweenList } = adminAnddealBetweenProfile;

    return (
      <PageHeaderWrapper>
        <Card>
          <div className={styles.title}>组间交易表</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={dealBetweenList}
            columns={dealBetweenColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DealBetweenProfile;
