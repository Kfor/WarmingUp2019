import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  InputNumber,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Typography, Col, Dropdown, Icon, Menu, Row } from 'antd';
const { Title, Paragraph, Text } = Typography;

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';

import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = InputNumber;

interface DownInputProps extends FormComponentProps {
  submitting1: boolean;
  submitting2: boolean;
  submitting3: boolean;
  submitting4: boolean;
  user: CurrentUser;
  dispatch: Dispatch<any>;
}

class DownInput extends Component<DownInputProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  handleSubmit1 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('inner', this.props);

      values.userId = this.props.location.query.userId;
      if (!err) {
        console.log('values', values);
        dispatch({
          type: 'downDownInput/submitRegularForm1',
          payload: values,
        });
      }
    });
    form.resetFields();
  };

  handleSubmit2 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      //console.log('inner',this.props.currentUser)

      values.userId = this.props.location.query.userId;

      if (!err) {
        console.log('values', values);
        dispatch({
          type: 'downDownInput/submitRegularForm2',
          payload: values,
        });
      }
    });
    form.resetFields();
  };

  handleSubmit3 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('inner', this.props);

      values.userId = this.props.location.query.userId;
      if (!err) {
        console.log('values', values);
        dispatch({
          type: 'downDownInput/submitRegularForm3',
          payload: values,
        });
      }
    });
    form.resetFields();
  };

  handleSubmit4 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('inner', this.props);

      values.userId = this.props.location.query.userId;
      if (!err) {
        console.log('values', values);
        dispatch({
          type: 'downDownInput/submitRegularForm4',
          payload: values,
        });
      }
    });
    form.resetFields();
  };

  render() {
    const { submitting1, submitting2, submitting3, submitting4 } = this.props;
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
        <GridContent>
          <React.Fragment>
            <Row
              gutter={8}
              type="flex"
              align="bottom"
              style={{
                marginTop: 24,
              }}
            >
              <Col span={12}>
                <Card bordered={true} size="small">
                  <Form
                    onSubmit={this.handleSubmit1}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                      marginLeft: 75,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.adInvest.label" />}
                    >
                      {getFieldDecorator('adInvest', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          step={10000}
                          placeholder={formatMessage({
                            id: 'down-downinput.adInvest.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting1}>
                        <FormattedMessage id="down-downinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
                <Card bordered={true} size="small">
                  <Form
                    onSubmit={this.handleSubmit3}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                      marginLeft: 75,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.loan.label" />}
                    >
                      {getFieldDecorator('loan', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'down-downinput.loan.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting3}>
                        <FormattedMessage id="down-downinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>

                  <Form
                    onSubmit={this.handleSubmit4}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                      marginLeft: 75,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.repay.label" />}
                    >
                      {getFieldDecorator('repay', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'down-downinput.repay.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting4}>
                        <FormattedMessage id="down-downinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
              </Col>

              <Col span={12}>
                <Card
                  bordered={true}
                  size="small"
                  style={{
                    minHeight: 476,
                  }}
                >
                  <Form
                    onSubmit={this.handleSubmit2}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                      minWidth: 600,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.ka.label" />}
                    >
                      {getFieldDecorator('ka', {
                        initialValue: 1,
                      })(
                        // <InputNumber
                        //   min={0}
                        //   placeholder={formatMessage({
                        //     id: 'down-downinput.ka.placeholder',
                        //   })}
                        // />,
                        <Radio.Group size="small">
                          <Radio value="1">消费级</Radio>
                          <Radio value="2">专业级</Radio>
                          <Radio value="3">旗舰级</Radio>
                        </Radio.Group>,
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.kb.label" />}
                    >
                      {getFieldDecorator('kb', {
                        initialValue: 1,
                      })(
                        // <InputNumber
                        //   min={0}
                        //   placeholder={formatMessage({
                        //     id: 'down-downinput.kb.placeholder',
                        //   })}
                        // />,
                        <Radio.Group size="small">
                          <Radio value="1">低</Radio>
                          <Radio value="2">中</Radio>
                          <Radio value="3">高</Radio>
                        </Radio.Group>,
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.kc.label" />}
                    >
                      {getFieldDecorator('kc', {
                        initialValue: 1,
                      })(
                        // <InputNumber
                        //   min={0}
                        //   placeholder={formatMessage({
                        //     id: 'down-downinput.kc.placeholder',
                        //   })}
                        // />,
                        <Radio.Group size="small">
                          <Radio value="1">低</Radio>
                          <Radio value="2">中</Radio>
                          <Radio value="3">高</Radio>
                        </Radio.Group>,
                      )}
                    </FormItem>

                    {/* down-downinput.price */}
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.price.label" />}
                    >
                      {getFieldDecorator('price', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'down-downinput.price.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.amount.label" />}
                    >
                      {getFieldDecorator('amount', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'down-downinput.amount.placeholder',
                          })}
                        />,
                      )}
                      <Text> 台</Text>
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting2}>
                        <FormattedMessage id="down-downinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
              </Col>
            </Row>
          </React.Fragment>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<DownInputProps>()(
  connect(
    ({
      user,
      loading,
    }: {
      loading: { effects: { [key: string]: boolean } };
      user: ConnectState;
    }) => ({
      submitting1: loading.effects['downDownInput/submitRegularForm1'],
      submitting2: loading.effects['downDownInput/submitRegularForm2'],
      submitting3: loading.effects['downDownInput/submitRegularForm3'],
      submitting4: loading.effects['downDownInput/submitRegularForm4'],

      currentUser: user.currentUser,
    }),
  )(DownInput),
);
