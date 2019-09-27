import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class Down extends Component {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'exchangeDown/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    return (
      <PageHeaderWrapper content={<FormattedMessage id="exchange-down.basic.description" />}>
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
              label={<FormattedMessage id="exchange-down.up_id.label" />}
            >
              {getFieldDecorator('up_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-down.up_id.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-down.up_id.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="exchange-down.down_id.label" />}
            >
              {getFieldDecorator('down_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-down.down_id.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-down.down_id.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="exchange-down.price.label" />}
            >
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-down.price.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-down.price.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="exchange-down.count.label" />}
            >
              {getFieldDecorator('count', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-down.count.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-down.count.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="exchange-down.phone_id.label" />}
            >
              {getFieldDecorator('phone_id', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-down.phone_id.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-down.phone_id.placeholder',
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
                <FormattedMessage id="exchange-down.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="exchange-down.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(
  connect(({ loading }) => ({
    submitting: loading.effects['exchangeDown/submitRegularForm'],
  }))(Down),
);
