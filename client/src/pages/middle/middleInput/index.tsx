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
  Table,
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

interface MiddleInputProps extends FormComponentProps {
  submittingall: boolean;
  user: CurrentUser;
  dispatch: Dispatch<any>;
}

class MiddleInput extends Component<MiddleInputProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  handleSubmitall = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      values.userId = this.props.location.query.userId;
      if (!err) {
        console.log(values);
        dispatch({
          type: 'middleMiddleInput/submitRegularForm',
          payload: values,
        });
      }
    });
    form.resetFields();
  };

  render() {
    const { submittingall } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 10 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 20, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper content={<FormattedMessage id="middle-middleinput.basic.description" />}>
        <GridContent>
          <React.Fragment>
            <Form
              onSubmit={this.handleSubmitall}
              hideRequiredMark
              style={{
                marginTop: 8,
                marginLeft: 0,
              }}
            >
              <Row
                gutter={4}
                type="flex"
                align="bottom"
                style={{
                  marginTop: 24,
                  marginBottom: 4,
                }}
              >
                <Col span={7}>
                  <Card
                    bordered={true}
                    style={{
                      minHeight: 360,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="middle-middleinput.DInvest.label" />}
                    >
                      {getFieldDecorator('DInvest', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'middle-middleinput.DInvest.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="middle-middleinput.KInvest.label" />}
                    >
                      {getFieldDecorator('KInvest', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'middle-middleinput.KInvest.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>
                  </Card>
                </Col>

                <Col span={10}>
                  <Card
                    bordered={true}
                    size="small"
                    style={{
                      height: 360,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="middle-middleinput.ka.label" />}
                    >
                      {getFieldDecorator('ka', {
                        initialValue: 1,
                      })(
                        // <InputNumber
                        //   min={0}
                        //   placeholder={formatMessage({
                        //     id: 'middle-middleinput.ka.placeholder',
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
                      label={<FormattedMessage id="middle-middleinput.kb.label" />}
                    >
                      {getFieldDecorator('kb', {
                        initialValue: 1,
                      })(
                        // <InputNumber
                        //   min={0}
                        //   placeholder={formatMessage({
                        //     id: 'middle-middleinput.kb.placeholder',
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
                      label={<FormattedMessage id="middle-middleinput.kc.label" />}
                    >
                      {getFieldDecorator('kc', {
                        initialValue: 1,
                      })(
                        // <InputNumber
                        //   min={0}
                        //   placeholder={formatMessage({
                        //     id: 'middle-middleinput.kc.placeholder',
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
                      label={<FormattedMessage id="middle-middleinput.amount.label" />}
                    >
                      {getFieldDecorator('amount', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'middle-middleinput.amount.placeholder',
                          })}
                        />,
                      )}
                      <Text> 台</Text>
                    </FormItem>
                  </Card>
                </Col>

                <Col span={7}>
                  <Card
                    bordered={true}
                    style={{
                      minHeight: 360,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="middle-middleinput.loan.label" />}
                    >
                      {getFieldDecorator('loan', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'middle-middleinput.loan.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="middle-middleinput.repay.label" />}
                    >
                      {getFieldDecorator('repay', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'middle-middleinput.repay.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>
                  </Card>
                </Col>
              </Row>
              <Card>
                <Row>
                  <Col span={11}></Col>
                  <Col>
                    <Button type="primary" htmlType="submit" loading={submittingall}>
                      <FormattedMessage id="middle-middleinput.form.submit" />
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Form>
          </React.Fragment>
        </GridContent>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<MiddleInputProps>()(
  connect(
    ({
      user,
      loading,
    }: {
      loading: { effects: { [key: string]: boolean } };
      user: ConnectState;
    }) => ({
      submittingall: loading.effects['middleMiddleInput/submitRegularForm'],

      currentUser: user.currentUser,
    }),
  )(MiddleInput),
);
