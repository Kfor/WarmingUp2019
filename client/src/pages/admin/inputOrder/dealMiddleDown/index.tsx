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
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.middle_id.required',
                    }),
                  },
                ],
              })(
                <Input
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
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'adminandinputorderanddealmiddledown.down_id.required',
                    }),
                  },
                ],
              })(
                <Input
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
                <InputNumber
                  defaultValue={0}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.performance.placeholder',
                  })}
                />,
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
                <InputNumber
                  defaultValue={0}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.appearance.placeholder',
                  })}
                />,
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
                <InputNumber
                  defaultValue={0}
                  placeholder={formatMessage({
                    id: 'adminandinputorderanddealmiddledown.function.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="adminandinputorderanddealmiddledown.price.label" />}
            >
              {getFieldDecorator('price', {
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
                  defaultValue={0}
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
                  defaultValue={0}
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
