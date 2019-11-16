import request from '@/utils/request';

export async function fakeSubmitForm1(params: any) {
  if (params.adInvest === null) params.adInvest = 0;

  return request(
    '/api/downstream/advertise?' + 'userId=' + params.userId + '&adInvest=' + params.adInvest,
    {
      method: 'POST',
      data: params,
    },
  );
}
export async function fakeSubmitForm2(params: any) {
  if (params.ka === null) params.ka = 0;
  if (params.kb === null) params.kb = 0;
  if (params.kc === null) params.kc = 0;
  if (params.price === null) params.price = 0;
  if (params.amount === null) params.amount = 0;

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
  if (params.loan === null) params.loan = 0;

  return request('/api/downstream/loan?' + 'userId=' + params.userId + '&loan=' + params.loan, {
    method: 'POST',
    data: params,
  });
}
export async function fakeSubmitForm4(params: any) {
  if (params.repay === null) params.repay = 0;

  return request('/api/downstream/repay?' + 'userId=' + params.userId + '&repay=' + params.repay, {
    method: 'POST',
    data: params,
  });
}
