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
  Table,

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

interface MiddleInputProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class MiddleInput extends Component<MiddleInputProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'middleMiddleInput/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting} = this.props;
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
      <PageHeaderWrapper content={<FormattedMessage id="middle-middleinput.basic.description" />}>
        

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
              label={<FormattedMessage id="middle-middleinput.userId.label" />}
            >
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.userId.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'middle-middleinput.userId.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="middle-middleinput.ka.label" />}
            >
              {getFieldDecorator('ka', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.ka.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'middle-middleinput.ka.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="middle-middleinput.kb.label" />}
            >
              {getFieldDecorator('kb', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.kb.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'middle-middleinput.kb.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="middle-middleinput.kc.label" />}
            >
              {getFieldDecorator('kc', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.kc.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'middle-middleinput.kc.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="middle-middleinput.amount.label" />}
            >
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.amount.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'middle-middleinput.amount.placeholder',
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
                <FormattedMessage id="middle-middleinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="middle-middleinput.form.save" />
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
              label={<FormattedMessage id="middle-middleinput.DInvest.label" />}
            >
              {getFieldDecorator('DInvest', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.DInvest.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'middle-middleinput.DInvest.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="middle-middleinput.KInvest.label" />}
            >
              {getFieldDecorator('KInvest', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.KInvest.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'middle-middleinput.KInvest.placeholder',
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
                <FormattedMessage id="middle-middleinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="middle-middleinput.form.save" />
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
              label={<FormattedMessage id="middle-middleinput.loan.label" />}
            >
              {getFieldDecorator('loan', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'middle-middleinput.loan.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'middle-middleinput.loan.placeholder',
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
                <FormattedMessage id="middle-middleinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="middle-middleinput.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>


      </PageHeaderWrapper>
    );
  }
}

export default Form.create<MiddleInputProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['middleMiddleInput/submitRegularForm'],
  }))(MiddleInput),
);
