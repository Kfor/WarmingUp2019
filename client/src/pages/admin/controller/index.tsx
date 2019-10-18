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

interface ControllerProps extends FormComponentProps {
  submitting1: boolean;
  submitting2: boolean;
  dispatch: Dispatch<any>;
}

class Controller extends Component<ControllerProps> {
  handleSubmit1 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'adminAndcontroller/submitRegularForm1',
          payload: values,
        });
      }
    });
  };
  handleSubmit2 = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'adminAndcontroller/submitRegularForm2',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting1, submitting2 } = this.props;
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
      <PageHeaderWrapper content={<FormattedMessage id="adminandcontroller.basic.description" />}>
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit1}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting1}>
                <FormattedMessage id="adminandcontroller.form.submit1" />
              </Button>
            </FormItem>
          </Form>
          <Form
            onSubmit={this.handleSubmit2}
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
          >
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting2}>
                <FormattedMessage id="adminandcontroller.form.submit2" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<ControllerProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting1: loading.effects['adminAndcontroller/submitRegularForm1'],
    submitting2: loading.effects['adminAndcontroller/submitRegularForm2'],
  }))(Controller),
);
