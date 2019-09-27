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
  Table,
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


@connect(({ profileBasic2Js, loading }) => ({
  profileBasic2Js,
  loading: loading.effects['profileBasic2Js/fetchBasic'],
}))


class BasicForm2 extends Component {
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formBasicForm2/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {

    // const { profileBasic2Js, loading } = this.props;
    const { submitting, loading} = this.props;
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


    let newPhonesData = [
      {
        id: '1',
        chip: 'A芯片',
        A: '此处显示美观值',
        B: '此处显示功能值',
        // cost:'此处显示成本',
        num: '780',
        price: '100',
        amount: '78000',
      },
    ]

    const newPhonesColumns = [
      {
        title: '计划编号',
        dataIndex: 'id',
        key: 'id',
        render: (text, row, index) => {
          if (index < newPhonesData.length) {
            return <a href="">{text}</a>;
          }

          return {
            children: (
              <span
                style={{
                  fontWeight: 600,
                }}
              >
                总计
              </span>
            ),
            props: {
              colSpan: 4,
            },
          };
        },
      },
      {
        title: '芯片种类（决定性能）',
        dataIndex: 'chip',
        key: 'chip',
        render: renderContent,
      },
      {
        title: '美观值',
        dataIndex: 'A',
        key: 'A',
        render: renderContent,
      },
      {
        title: '功能值',
        dataIndex: 'B',
        key: 'B',
        // align: 'B',
        render: renderContent,
      },

      {
        title: '单件成本',
        dataIndex: 'price',
        key: 'price',
        // align: 'B',
        render: renderContent,
      },

      {
        title: '数量（台）',
        dataIndex: 'num',
        key: 'num',
        // align: 'right',
        // render: (text, row, index) => {
        //   if (index < basicPhones.length) {
        //     return text;
        //   }

        //   return (
        //     <span
        //       style={{
        //         fontWeight: 600,
        //       }}
        //     >
        //       {text}
        //     </span>
        //   );
        // },
      },

      {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        // align: 'right',
        // render: (text, row, index) => {
        //   if (index < basicPhones.length) {
        //     return text;
        //   }

        //   return (
        //     <span
        //       style={{
        //         fontWeight: 600,
        //       }}
        //     >
        //       {text}
        //     </span>
        //   );
        // },
      },
    ];

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };

      if (index === newPhonesData.length) {
        obj.props.colSpan = 0;
      }

      return obj;
    };

    return (
      <PageHeaderWrapper content={<FormattedMessage id="form-basic-form2.basic.description" />}>
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
              label={<FormattedMessage id="form-basic-form2.userId.label" />}
            >
              {getFieldDecorator('userId', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form2.userId.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form2.userId.placeholder',
                  })}
                />,
              )}
            </FormItem>

            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-basic-form2.loan.label" />}
            >
              {getFieldDecorator('loan', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({
                      id: 'form-basic-form2.loan.required',
                    }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({
                    id: 'form-basic-form2.loan.placeholder',
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
                <FormattedMessage id="form-basic-form2.form.submit" />
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                <FormattedMessage id="form-basic-form2.form.save" />
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
    submitting: loading.effects['formBasicForm2/submitRegularForm'],
  }))(BasicForm2),
);
