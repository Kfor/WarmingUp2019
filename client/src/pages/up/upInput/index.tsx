import { Button, Card, Form, InputNumber, Descriptions } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { Typography, Col, Row } from 'antd';
const { Text, Paragraph } = Typography;

import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { CurrentUser } from '@/models/user';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
const FormItem = Form.Item;
interface UpInputProps extends FormComponentProps {
  submittingall: boolean;
  user: CurrentUser;
  dispatch: Dispatch<any>;
}

class UpInput extends Component<UpInputProps> {
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
        dispatch({
          type: 'upUpInput/submitRegularForm',
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
        xs: {
          span: 18,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 18,
        },
        sm: {
          span: 10,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 20,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };
    return (
      <PageHeaderWrapper
        content={
          <Typography>
            <Paragraph>你是上游公司，本环节将进行芯片生产、科研投入、生产技术投入。</Paragraph>
            注意：1. 可以多次提交； 2.
            在“余额不足”、“借贷额度不足”时，会自动罚款20w（正确部分仍生效）； 3. 首轮贷款额度为0。
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
                gutter={8}
                type="flex"
                align="bottom"
                style={{
                  marginTop: 24,
                  marginBottom: 6,
                }}
              >
                <Col span={8}>
                  <Card
                    bordered={true}
                    style={{
                      minHeight: 240,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.TInvest.label" />}
                    >
                      {getFieldDecorator('TInvest', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          // placeholder={formatMessage({
                          //   id: 'up-upinput.TInvest.placeholder',
                          // })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card
                    bordered={true}
                    style={{
                      height: 240,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.chip1.label" />}
                    >
                      {getFieldDecorator('chip1Num', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          // placeholder={formatMessage({
                          //   id: 'up-upinput.chip1.placeholder',
                          // })}
                        />,
                      )}
                      <Text> 个</Text>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.chip2.label" />}
                    >
                      {getFieldDecorator('chip2Num', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          // placeholder={formatMessage({
                          //   id: 'up-upinput.chip2.placeholder',
                          // })}
                        />,
                      )}
                      <Text> 个</Text>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.chip3.label" />}
                    >
                      {getFieldDecorator('chip3Num', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          // placeholder={formatMessage({
                          //   id: 'up-upinput.chip3.placeholder',
                          // })}
                        />,
                      )}
                      <Text> 个</Text>
                    </FormItem>
                  </Card>
                </Col>

                <Col span={8}>
                  <Card
                    bordered={true}
                    style={{
                      minHeight: 240,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.loan.label" />}
                    >
                      {getFieldDecorator('loan', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'up-upinput.loan.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.repay.label" />}
                    >
                      {getFieldDecorator('repay', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          placeholder={formatMessage({
                            id: 'up-upinput.repay.placeholder',
                          })}
                        />,
                      )}
                      <Text> 元</Text>
                    </FormItem>
                  </Card>
                </Col>
              </Row>
              <Card bordered={true}>
                <Row>
                  <Col span={11}></Col>
                  <Col>
                    <Button type="primary" htmlType="submit" loading={submittingall}>
                      <FormattedMessage id="up-upinput.form.submit" />
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

export default Form.create<UpInputProps>()(
  connect(
    ({
      user,
      loading,
    }: {
      loading: { effects: { [key: string]: boolean } };
      user: ConnectState;
    }) => ({
      submittingall: loading.effects['upUpInput/submitRegularForm'],

      currentUser: user.currentUser,
    }),
  )(UpInput),
);
