import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/top/dealBetween?'+'userId1='+params.userId_1+'userId2='+params.userId_2+'money='+params.money+'returnMoney='+params.returnMoney+'turnsAfter='+params.circle, {
    method: 'POST',
    data: params,
  });
}
