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
    submitRegularForm: Effect;
  };
}
const Model: ModelType = {
  namespace: 'downDownInput',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      var t1 = yield call(fakeSubmitForm3, payload);
      var t2 = yield call(fakeSubmitForm1, payload);
      var t3 = yield call(fakeSubmitForm2, payload);
      var t4 = yield call(fakeSubmitForm4, payload);
      if (t1.status == 200 && t2.status == 200 && t3.status == 200 && t4.status == 200)
        message.success('提交成功');
    },
  },
};

export default Model;
