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
  Divider,
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

class BasicForm3 extends Component {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formBasicForm3/submitRegularForm',
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
      <PageHeaderWrapper content={<FormattedMessage id="form-basic-form3.basic.description" />}>
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
              label={<FormattedMessage id="form-basic-form3.userId.label" />}
            >
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.userId.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.userId.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form3.round.label" />}
            >
              {getFieldDecorator('round', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.round.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.round.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <Divider
              style={{
                marginBottom: 32,
              }}
            />

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form3.chipValue.label" />}
            >
              {getFieldDecorator('chipValue', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.chipValue.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.chipValue.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form3.TValue.label" />}
            >
              {getFieldDecorator('TValue', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.TValue.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.TValue.placeholder',
                  })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form3.MValue.label" />}
            >
              {getFieldDecorator('MValue', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.MValue.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.MValue.placeholder',
                  })}
                />,
              )}
            </FormItem>

            {/* form-basic-form3.price */}
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form3.price.label" />}
            >
              {getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.price.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.price.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form3.amount.label" />}
            >
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form3.amount.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form3.amount.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <Divider
              style={{
                marginBottom: 32,
              }}
            />
           


            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form-basic-form3.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="form-basic-form3.form.save" />
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
    submitting: loading.effects['formBasicForm3/submitRegularForm'],
  }))(BasicForm3),
);
