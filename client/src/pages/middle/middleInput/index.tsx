import { Button, Card, Form, InputNumber, Radio } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Typography, Col, Row } from 'antd';
const { Text, Paragraph } = Typography;

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';

const FormItem = Form.Item;

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
      <PageHeaderWrapper
        content={
          <Typography>
            <Paragraph>你是中游公司，本环节将进行手机生产、设计投入、功能模块投入。</Paragraph>
            <Paragraph>
              注意：1. 可以多次提交；2.
              在“余额不足”、“芯片库存不足”、“借贷额度不足”时，会自动罚款20w（正确部分仍生效）；3.
              首轮贷款额度为0。
            </Paragraph>
          </Typography>
        }
      >
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
