import { Button, Card, Form } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const FormItem = Form.Item;

interface DealBetweenProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class DealBetween extends Component<DealBetweenProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'adminAndinputOrderAnddealBetween/submitRegularForm',
          payload: values,
        });
      }
    });
    form.resetFields();
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderWrapper content={<FormattedMessage id="credit.basic.description" />}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem {...formItemLayout} label={<FormattedMessage id="credit.userId_1.label" />}>
              {getFieldDecorator('userId_1', {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'credit.userId_1.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  placeholder={formatMessage({
                    id: 'credit.userId_1.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="credit.userId_2.label" />}>
              {getFieldDecorator('userId_2', {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'credit.userId_2.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  placeholder={formatMessage({
                    id: 'credit.userId_2.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="credit.money.label" />}>
              {getFieldDecorator('money', {
                initialValue: 1000000,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'credit.money.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  step={100000}
                  min={1000000}
                  placeholder={formatMessage({
                    id: 'credit.money.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="credit.returnMoney.label" />}
            >
              {getFieldDecorator('returnMoney', {
                initialValue: 1000000,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'credit.returnMoney.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  step={100000}
                  placeholder={formatMessage({
                    id: 'credit.returnMoney.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="credit.circle.label" />}>
              {getFieldDecorator('circle', {
                initialValue: 2,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'credit.circle.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  min={2}
                  placeholder={formatMessage({
                    id: 'credit.circle.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="credit.form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DealBetweenProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['adminAndinputOrderAnddealBetween/submitRegularForm'],
  }))(DealBetween),
);
