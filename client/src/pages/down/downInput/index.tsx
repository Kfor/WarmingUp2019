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
import { Col, Dropdown, Icon, Menu, Row } from 'antd';

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
const { TextArea } = Input;

interface DownInputProps extends FormComponentProps {
  submitting1: boolean;
  submitting2: boolean;
  submitting3: boolean;
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
  };
  render() {
    const { submitting1, submitting2, submitting3 } = this.props;
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
              <Col span={8}>
                <Card bordered={true}>
                  <Form
                    onSubmit={this.handleSubmit1}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.adInvest.label" />}
                    >
                      {getFieldDecorator('adInvest', {})(
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
                      <Button type="primary" htmlType="submit" loading={submitting1}>
                        <FormattedMessage id="down-downinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
                <Card bordered={true}>
                  <Form
                    onSubmit={this.handleSubmit3}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.loan.label" />}
                    >
                      {getFieldDecorator('loan', {})(
                        <Input
                          placeholder={formatMessage({
                            id: 'down-downinput.loan.placeholder',
                          })}
                        />,
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.repay.label" />}
                    >
                      {getFieldDecorator('repay', {})(
                        <Input
                          placeholder={formatMessage({
                            id: 'down-downinput.repay.placeholder',
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
                      <Button type="primary" htmlType="submit" loading={submitting3}>
                        <FormattedMessage id="down-downinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
              </Col>

              <Col span={8}>
                <Card bordered={true}>
                  <Form
                    onSubmit={this.handleSubmit2}
                    hideRequiredMark
                    style={{
                      marginTop: 8,
                    }}
                  >
                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="down-downinput.ka.label" />}
                    >
                      {getFieldDecorator('ka', {})(
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
                      {getFieldDecorator('kb', {})(
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
                      {getFieldDecorator('kc', {})(
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
                      {getFieldDecorator('price', {})(
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
                      {getFieldDecorator('amount', {})(
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
      currentUser: user.currentUser,
    }),
  )(DownInput),
);
