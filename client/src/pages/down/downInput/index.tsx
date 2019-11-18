import { Button, Card, Form, InputNumber, Radio } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Typography, Col, Dropdown, Icon, Menu, Row } from 'antd';
const { Text, Paragraph } = Typography;

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { CurrentUser } from '@/models/user';

const FormItem = Form.Item;

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

  handleSubmitall = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('inner', this.props);

      values.userId = this.props.location.query.userId;
      if (!err) {
        console.log('values', values);
        dispatch({
          type: 'downDownInput/submitRegularForm',
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
        content={
          <Typography>
            <Paragraph>你是下游公司，本环节将进行手机销售、广告投入。</Paragraph>
            <Paragraph>
              注意：1. 可以多次提交；2.
              在“余额不足”、“手机库存不足”、“借贷额度不足”时，会自动罚款20w（正确部分仍生效）；3.
              首轮贷款额度为0；4. 整个表单中借贷最先执行。
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
                gutter={8}
                type="flex"
                align="bottom"
                style={{
                  marginTop: 24,
                  marginBottom: 6,
                }}
              >
                <Col span={10}>
                  <Card bordered={true} style={{ minHeight: 150 }}>
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
                  </Card>
                  <Card bordered={true} style={{ minHeight: 200 }}>
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
                  </Card>
                </Col>

                <Col span={14}>
                  <Card
                    bordered={true}
                    size="small"
                    style={{
                      minHeight: 350,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.ka.label" />}
                    >
                      {getFieldDecorator('ka', {
                        initialValue: 1,
                      })(
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
                  </Card>
                </Col>
              </Row>
              <Card bordered={true}>
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

export default Form.create<DownInputProps>()(
  connect(
    ({
      user,
      loading,
    }: {
      loading: { effects: { [key: string]: boolean } };
      user: ConnectState;
    }) => ({
      submittingall: loading.effects['downDownInput/submitRegularForm'],

      currentUser: user.currentUser,
    }),
  )(DownInput),
);
