import { Button, Card, Form, InputNumber, Radio } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

const FormItem = Form.Item;

interface DealMiddleDownProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class DealMiddleDown extends Component<DealMiddleDownProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'adminAndinputOrderAnddealMiddleDown/submitRegularForm',
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
      <PageHeaderWrapper
        content={<FormattedMessage id="adminandinputorderanddealmiddledown.basic.description" />}
      >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.middle_id.label" />}
            >
              {getFieldDecorator('middle_id', {
                initialValue: 5,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.middle_id.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  min={5}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.middle_id.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.down_id.label" />}
            >
              {getFieldDecorator('down_id', {
                initialValue: 10,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.down_id.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  min={10}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.down_id.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={
                <FormattedMessage id="adminandinputorderanddealmiddledown.performance.label" />
              }
            >
              {getFieldDecorator('performance', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.performance.required',
                    }),
                  },
                ],
              })(
                <Radio.Group size="small">
                  <Radio value="1">消费级</Radio>
                  <Radio value="2">专业级</Radio>
                  <Radio value="3">旗舰级</Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.appearance.label" />}
            >
              {getFieldDecorator('appearance', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.appearance.required',
                    }),
                  },
                ],
              })(
                <Radio.Group size="small">
                  <Radio value="1">低</Radio>
                  <Radio value="2">中</Radio>
                  <Radio value="3">高</Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.function.label" />}
            >
              {getFieldDecorator('function', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.function.required',
                    }),
                  },
                ],
              })(
                <Radio.Group size="small">
                  <Radio value="1">低</Radio>
                  <Radio value="2">中</Radio>
                  <Radio value="3">高</Radio>
                </Radio.Group>,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.price.label" />}
            >
              {getFieldDecorator('price', {
                initialValue: 1000,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.price.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  step={500}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.price.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.count.label" />}
            >
              {getFieldDecorator('count', {
                initialValue: 1000,
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.count.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  step={1000}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.count.placeholder',
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
                <FormattedMessage id="adminandinputorderanddealmiddledown.form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DealMiddleDownProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['adminAndinputOrderAnddealMiddleDown/submitRegularForm'],
  }))(DealMiddleDown),
);
