import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request(
    '/api/top/dealBetween?' +
      'userId1=group' +
      params.userId_1 +
      '&userId2=group' +
      params.userId_2 +
      '&money=' +
      params.money +
      '&returnMoney=' +
      params.returnMoney +
      '&endTurn=' +
      params.circle,
    {
      method: 'POST',
      data: params,
    },
  );
}
