import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { UserInfo } from './data.d';

import { queryBasicProfile } from './service';

export interface StateType {
  //  basicGoods: BasicGood[];
  userInfo: UserInfo[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'upUpProfile',

  state: {
    //basicGoods: [],
    userInfo: [],
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      console.log(response);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
