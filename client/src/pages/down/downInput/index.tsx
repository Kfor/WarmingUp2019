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
const { TextArea } = Input;

interface DownInputProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class DownInput extends Component<DownInputProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'downDownInput/submitRegularForm',
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
      <PageHeaderWrapper content={<FormattedMessage id="down-downinput.basic.description" />}>
        <Card bordered={true}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
          
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.userId.label" />}
            >
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.userId.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.userId.placeholder',
                  })}
                />,
              )}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.adInvest.label" />}
            >
              {getFieldDecorator('adInvest', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.adInvest.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'down-downinput.adInvest.placeholder',
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
                <FormattedMessage id="down-downinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="down-downinput.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>

        <Card bordered={true}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
        

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.ka.label" />}
            >
              {getFieldDecorator('ka', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.ka.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.ka.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.kb.label" />}
            >
              {getFieldDecorator('kb', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.kb.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.kb.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.kc.label" />}
            >
              {getFieldDecorator('kc', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.kc.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.kc.placeholder',
                  })}
                />,
              )}
            </FormItem>

            {/* down-downinput.price */}
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.price.label" />}
            >
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.price.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.price.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.amount.label" />}
            >
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.amount.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.amount.placeholder',
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
                <FormattedMessage id="down-downinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="down-downinput.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>

        <Card bordered={true}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="down-downinput.loan.label" />}
            >
              {getFieldDecorator('loan', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'down-downinput.loan.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'down-downinput.loan.placeholder',
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
                <FormattedMessage id="down-downinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="down-downinput.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DownInputProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['downDownInput/submitRegularForm'],
  }))(DownInput),
);
