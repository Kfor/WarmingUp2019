import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm } from './service';

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
  namespace: 'adminAndinputOrderAnddealBetween',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      var t = yield call(fakeSubmitForm, payload);
      if (t.status == 200) message.success('提交成功');
    },
  },
};

export default Model;
