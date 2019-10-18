import { Badge, Card, Descriptions, Divider, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { UserRank } from './data.d';
import styles from './style.less';

interface RankProps {
  loading: boolean;
  dispatch: Dispatch<any>;
  adminAndrank: UserRank;
}
interface RankState {
  visible: boolean;
}

const users = [
  {
    title: 'userId',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'totalStorageCost',
    dataIndex: 'totalStorageCost',
    key: 'totalStorageCost',
  },
  {
    title: 'currency',
    dataIndex: 'currency',
    key: 'currency',
    sorter: (a, b) => a.currency - b.currency,
  },
  {
    title: 'loan',
    dataIndex: 'loan',
    key: 'loan',
  },
  {
    title: 'loanMax',
    dataIndex: 'loanMax',
    key: 'loanMax',
  },
  {
    title: 'rank',
    dataIndex: 'rank',
    key: 'rank',
  },
];

@connect(
  ({
    adminAndrank,
    loading,
  }: {
    adminAndrank: UserRank;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    adminAndrank,
    loading: loading.effects['adminAndrank/fetchBasic'],
  }),
)
class Rank extends Component<RankProps, RankState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminAndrank/fetchBasic',
    });
  }

  render() {
    const { adminAndrank, loading } = this.props;
    const { userRank, round } = adminAndrank;

    return (
      <PageHeaderWrapper>
        <Card bordered={true}>
          <Descriptions title="">
            <Descriptions.Item label="">这是第{round}轮</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false}>
          <div className={styles.title}>Rank</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={userRank}
            columns={users}
            rowKey="id"
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Rank;
