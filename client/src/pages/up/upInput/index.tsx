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
import { Col, Dropdown, Icon, Menu, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { CurrentUser } from '@/models/user';
import { connect } from 'dva';
import styles from './style.less';
import FormCustomizedFormControls from './FormCustomizedFormControls';
import { ConnectState } from '@/models/connect';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = InputNumber;
interface UpInputProps extends FormComponentProps {
  submitting1: boolean;
  submitting2: boolean;
  submitting3: boolean;
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

  handleSubmit1 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log('inner', this.props);

      values.userId = this.props.location.query.userId;
      if (!err) {
        console.log('values', values);
        dispatch({
          type: 'upUpInput/submitRegularForm1',
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
          type: 'upUpInput/submitRegularForm2',
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
          type: 'upUpInput/submitRegularForm3',
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
      <PageHeaderWrapper content={<FormattedMessage id="up-upinput.basic.description" />}>
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
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label={<FormattedMessage id="up-upinput.MInvest.label" />}
                    >
                      {getFieldDecorator('MInvest', {
                        initialValue: 0,
                      })(
                        <InputNumber
                          min={0}
                          // placeholder={formatMessage({
                          //   id: 'up-upinput.MInvest.placeholder',
                          // })} // min={0}
                          // max={100}
                        />,
                      )}
                      {/* <span className="ant-form-text">万</span> */}
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting1}>
                        <FormattedMessage id="up-upinput.form.submit" />
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
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting2}>
                        <FormattedMessage id="up-upinput.form.submit" />
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
              </Col>

              <Col span={8}>
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
                    </FormItem>

                    <FormItem
                      {...submitFormLayout}
                      style={{
                        marginTop: 32,
                      }}
                    >
                      <Button type="primary" htmlType="submit" loading={submitting3}>
                        <FormattedMessage id="up-upinput.form.submit" />
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

export default Form.create<UpInputProps>()(
  connect(
    ({
      user,
      loading,
    }: {
      loading: { effects: { [key: string]: boolean } };
      user: ConnectState;
    }) => ({
      submitting1: loading.effects['upUpInput/submitRegularForm1'],
      submitting2: loading.effects['upUpInput/submitRegularForm2'],
      submitting3: loading.effects['upUpInput/submitRegularForm3'],
      currentUser: user.currentUser,
    }),
  )(UpInput),
);
