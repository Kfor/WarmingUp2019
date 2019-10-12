import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm1,fakeSubmitForm2,fakeSubmitForm3 } from './service';

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
  namespace: 'middleMiddleInput',

  state: {},

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm1, payload);
      yield call(fakeSubmitForm2, payload);
      yield call(fakeSubmitForm3, payload);

      message.success('提交成功');
    },
  },
};

export default Model;
