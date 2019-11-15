import request from '@/utils/request';

export async function fakeSubmitForm1(params: any) {
  return request(
    '/api/downstream/advertise?' + 'userId=' + params.userId + '&adInvest=' + params.adInvest,
    {
      method: 'POST',
      data: params,
    },
  );
}
export async function fakeSubmitForm2(params: any) {
  return request(
    '/api/downstream/sell?' +
      'userId=' +
      params.userId +
      '&ka=' +
      params.ka +
      '&kb=' +
      params.kb +
      '&kc=' +
      params.kc +
      '&price=' +
      params.price +
      '&amount=' +
      params.amount,
    {
      method: 'POST',
      data: params,
    },
  );
}
export async function fakeSubmitForm3(params: any) {
  return request('/api/downstream/loan?' + 'userId=' + params.userId + '&loan=' + params.loan, {
    method: 'POST',
    data: params,
  });
}
export async function fakeSubmitForm4(params: any) {
  return request('/api/downstream/repay?' + 'userId=' + params.userId + '&repay=' + params.repay, {
    method: 'POST',
    data: params,
  });
}
