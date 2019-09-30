import React from 'react';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';

const CodePreview = ({ children }) => (
  <pre
    style={{
      background: '#f2f4f5',
      padding: '12px 20px',
      margin: '12px 0',
    }}
  >
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="欢迎参加 ITP 2018级 Warming Up"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />

      {/* <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
          <FormattedMessage
            id="app.welcome.link.block-list"
            defaultMessage="基于 block 开发，快速构建标准页面"
          />
        </a>
      </Typography.Text> */}


      {/* <CodePreview>npx umi block list</CodePreview> */}


      {/* <Typography.Text
        strong
        style={{
          marginBottom: 12,
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks"
        >
          <FormattedMessage id="app.welcome.link.fetch-blocks" defaultMessage="获取全部区块" />
        </a>
      </Typography.Text>
      <CodePreview> npm run fetch:blocks</CodePreview> */}

    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Good Luck 🍀
      {/* Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a> */}
      
    </p>
  </PageHeaderWrapper>
);
