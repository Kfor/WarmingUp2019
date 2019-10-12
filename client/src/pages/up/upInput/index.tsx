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

interface UpInputProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class UpInput extends Component<UpInputProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'upUpInput/submitRegularForm',
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
    // return (
    //   <PageHeaderWrapper content={<FormattedMessage id="up-upinput.basic.description" />}>
    //     <Card bordered={false}>
    //       <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
    //         <FormItem {...formItemLayout} label={<FormattedMessage id="up-upinput.title.label" />}>
    //           {getFieldDecorator('title', {
    //             rules: [
    //               {
    //                 required: true,
    //                 message: formatMessage({ id: 'up-upinput.title.required' }),
    //               },
    //             ],
    //           })(<Input placeholder={formatMessage({ id: 'up-upinput.title.placeholder' })} />)}
    //         </FormItem>
    //         <FormItem {...formItemLayout} label={<FormattedMessage id="up-upinput.date.label" />}>
    //           {getFieldDecorator('date', {
    //             rules: [
    //               {
    //                 required: true,
    //                 message: formatMessage({ id: 'up-upinput.date.required' }),
    //               },
    //             ],
    //           })(
    //             <RangePicker
    //               style={{ width: '100%' }}
    //               placeholder={[
    //                 formatMessage({ id: 'up-upinput.placeholder.start' }),
    //                 formatMessage({ id: 'up-upinput.placeholder.end' }),
    //               ]}
    //             />,
    //           )}
    //         </FormItem>
    //         <FormItem {...formItemLayout} label={<FormattedMessage id="up-upinput.goal.label" />}>
    //           {getFieldDecorator('goal', {
    //             rules: [
    //               {
    //                 required: true,
    //                 message: formatMessage({ id: 'up-upinput.goal.required' }),
    //               },
    //             ],
    //           })(
    //             <TextArea
    //               style={{ minHeight: 32 }}
    //               placeholder={formatMessage({ id: 'up-upinput.goal.placeholder' })}
    //               rows={4}
    //             />,
    //           )}
    //         </FormItem>
    //         <FormItem
    //           {...formItemLayout}
    //           label={<FormattedMessage id="up-upinput.standard.label" />}
    //         >
    //           {getFieldDecorator('standard', {
    //             rules: [
    //               {
    //                 required: true,
    //                 message: formatMessage({ id: 'up-upinput.standard.required' }),
    //               },
    //             ],
    //           })(
    //             <TextArea
    //               style={{ minHeight: 32 }}
    //               placeholder={formatMessage({ id: 'up-upinput.standard.placeholder' })}
    //               rows={4}
    //             />,
    //           )}
    //         </FormItem>
    //         <FormItem
    //           {...formItemLayout}
    //           label={
    //             <span>
    //               <FormattedMessage id="up-upinput.client.label" />
    //               <em className={styles.optional}>
    //                 <FormattedMessage id="up-upinput.form.optional" />
    //                 <Tooltip title={<FormattedMessage id="up-upinput.label.tooltip" />}>
    //                   <Icon type="info-circle-o" style={{ marginRight: 4 }} />
    //                 </Tooltip>
    //               </em>
    //             </span>
    //           }
    //         >
    //           {getFieldDecorator('client')(
    //             <Input placeholder={formatMessage({ id: 'up-upinput.client.placeholder' })} />,
    //           )}
    //         </FormItem>
    //         <FormItem
    //           {...formItemLayout}
    //           label={
    //             <span>
    //               <FormattedMessage id="up-upinput.invites.label" />
    //               <em className={styles.optional}>
    //                 <FormattedMessage id="up-upinput.form.optional" />
    //               </em>
    //             </span>
    //           }
    //         >
    //           {getFieldDecorator('invites')(
    //             <Input placeholder={formatMessage({ id: 'up-upinput.invites.placeholder' })} />,
    //           )}
    //         </FormItem>
    //         <FormItem
    //           {...formItemLayout}
    //           label={
    //             <span>
    //               <FormattedMessage id="up-upinput.weight.label" />
    //               <em className={styles.optional}>
    //                 <FormattedMessage id="up-upinput.form.optional" />
    //               </em>
    //             </span>
    //           }
    //         >
    //           {getFieldDecorator('weight')(
    //             <InputNumber
    //               placeholder={formatMessage({ id: 'up-upinput.weight.placeholder' })}
    //               min={0}
    //               max={100}
    //             />,
    //           )}
    //           <span className="ant-form-text">%</span>
    //         </FormItem>
    //         <FormItem
    //           {...formItemLayout}
    //           label={<FormattedMessage id="up-upinput.public.label" />}
    //           help={<FormattedMessage id="up-upinput.label.help" />}
    //         >
    //           <div>
    //             {getFieldDecorator('public', {
    //               initialValue: '1',
    //             })(
    //               <Radio.Group>
    //                 <Radio value="1">
    //                   <FormattedMessage id="up-upinput.radio.public" />
    //                 </Radio>
    //                 <Radio value="2">
    //                   <FormattedMessage id="up-upinput.radio.partially-public" />
    //                 </Radio>
    //                 <Radio value="3">
    //                   <FormattedMessage id="up-upinput.radio.private" />
    //                 </Radio>
    //               </Radio.Group>,
    //             )}
    //             <FormItem style={{ marginBottom: 0 }}>
    //               {getFieldDecorator('publicUsers')(
    //                 <Select
    //                   mode="multiple"
    //                   placeholder={formatMessage({ id: 'up-upinput.publicUsers.placeholder' })}
    //                   style={{
    //                     margin: '8px 0',
    //                     display: getFieldValue('public') === '2' ? 'block' : 'none',
    //                   }}
    //                 >
    //                   <Option value="1">
    //                     <FormattedMessage id="up-upinput.option.A" />
    //                   </Option>
    //                   <Option value="2">
    //                     <FormattedMessage id="up-upinput.option.B" />
    //                   </Option>
    //                   <Option value="3">
    //                     <FormattedMessage id="up-upinput.option.C" />
    //                   </Option>
    //                 </Select>,
    //               )}
    //             </FormItem>
    //           </div>
    //         </FormItem>
    //         <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
    //           <Button type="primary" htmlType="submit" loading={submitting}>
    //             <FormattedMessage id="up-upinput.form.submit" />
    //           </Button>
    //           <Button style={{ marginLeft: 8 }}>
    //             <FormattedMessage id="up-upinput.form.save" />
    //           </Button>
    //         </FormItem>
    //       </Form>
    //     </Card>
    //   </PageHeaderWrapper>
    // );


    
    return (
      <PageHeaderWrapper content={<FormattedMessage id="up-upinput.basic.description" />}>
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
              label={<FormattedMessage id="up-upinput.userId.label" />}
            >
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.userId.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'up-upinput.userId.placeholder',
                  })}
                />,
              )}
            </FormItem>

          
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="up-upinput.TInvest.label" />}
            >
              {getFieldDecorator('TInvest', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.TInvest.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'up-upinput.TInvest.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="up-upinput.MInvest.label" />}
            >
              {getFieldDecorator('MInvest', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.MInvest.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                  id: 'up-upinput.MInvest.placeholder',
                  })}
                // min={0}
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
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="up-upinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="up-upinput.form.save" />
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
              label={<FormattedMessage id="up-upinput.chip1.label" />}
            >
              {getFieldDecorator('chip1Num', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.chip1.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'up-upinput.chip1.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="up-upinput.chip2.label" />}
            >
              {getFieldDecorator('chip2Num', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.chip2.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'up-upinput.chip2.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="up-upinput.chip3.label" />}
            >
              {getFieldDecorator('chip3Num', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.chip3.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'up-upinput.chip3.placeholder',
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
                <FormattedMessage id="up-upinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="up-upinput.form.save" />
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
              label={<FormattedMessage id="up-upinput.loan.label" />}
            >
              {getFieldDecorator('loan', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'up-upinput.loan.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'up-upinput.loan.placeholder',
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
                <FormattedMessage id="up-upinput.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="up-upinput.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );

  }
}

export default Form.create<UpInputProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['upUpInput/submitRegularForm'],
  }))(UpInput),
);
