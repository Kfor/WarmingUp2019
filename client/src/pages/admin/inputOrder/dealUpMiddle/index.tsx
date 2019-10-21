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

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = InputNumber;

interface DealUpMiddleProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class DealUpMiddle extends Component<DealUpMiddleProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'adminAndinputOrderAnddealUpMiddle/submitRegularForm',
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
      <PageHeaderWrapper content={<FormattedMessage id="exchange-up.basic.description" />}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem {...formItemLayout} label={<FormattedMessage id="exchange-up.up_id.label" />}>
              {getFieldDecorator('up_id', {
                initialValue: 'group',
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-up.up_id.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-up.up_id.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="exchange-up.middle_id.label" />}
            >
              {getFieldDecorator('middle_id', {
                initialValue: 'group',
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-up.middle_id.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'exchange-up.middle_id.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="exchange-up.quality.label" />}
            >
              {getFieldDecorator('quality', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-up.quality.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  defaultValue={0}
                  placeholder={formatMessage({
                    id: 'exchange-up.quality.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label={<FormattedMessage id="exchange-up.price.label" />}>
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-up.price.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  defaultValue={0}
                  placeholder={formatMessage({
                    id: 'exchange-up.price.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="exchange-up.count.label" />}>
              {getFieldDecorator('count', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'exchange-up.count.required',
                    }),
                  },
                ],
              })(
                <InputNumber
                  defaultValue={0}
                  placeholder={formatMessage({
                    id: 'exchange-up.count.placeholder',
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
                <FormattedMessage id="exchange-up.form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DealUpMiddleProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['adminAndinputOrderAnddealUpMiddle/submitRegularForm'],
  }))(DealUpMiddle),
);
