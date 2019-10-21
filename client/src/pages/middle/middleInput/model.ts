import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm1, fakeSubmitForm2, fakeSubmitForm3, fakeSubmitForm4 } from './service';

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
    submitRegularForm3: Effect;
    submitRegularForm4: Effect;
  };
}
const Model: ModelType = {
  namespace: 'middleMiddleInput',

  state: {},

  effects: {
    *submitRegularForm1({ payload }, { call }) {
      var t = yield call(fakeSubmitForm1, payload);
      if (t.status == 200) message.success('提交成功');
    },
    *submitRegularForm2({ payload }, { call }) {
      var t = yield call(fakeSubmitForm2, payload);
      if (t.status == 200) message.success('提交成功');
    },
    *submitRegularForm3({ payload }, { call }) {
      var t = yield call(fakeSubmitForm3, payload);
      if (t.status == 200) message.success('提交成功');
    },
    *submitRegularForm4({ payload }, { call }) {
      var t = yield call(fakeSubmitForm4, payload);
      if (t.status == 200) message.success('提交成功');
    },
  },
};

export default Model;
