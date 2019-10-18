import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm1, fakeSubmitForm2 } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitRegularForm1: Effect;
    submitRegularForm2: Effect;
  };
}
const Model: ModelType = {
  namespace: 'adminAndcontroller',

  state: {},

  effects: {
    *submitRegularForm1({ payload }, { call }) {
      yield call(fakeSubmitForm1, payload);
      message.success('提交成功');
    },
    *submitRegularForm2({ payload }, { call }) {
      yield call(fakeSubmitForm2, payload);
      message.success('提交成功');
    },
  },
};

export default Model;
