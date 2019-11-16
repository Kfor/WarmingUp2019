import request from '@/utils/request';

export async function fakeSubmitForm1(params: any) {
  if (params.TInvest === null) {
    params.TInvest = 0;
    console.log('0 again');
  }

  return request(
    '/api/upstream/invest?' + 'userId=' + params.userId + '&TInvest=' + params.TInvest, //+
    // '&MInvest=' +
    // params.MInvest,
    {
      method: 'POST',
      data: params,
    },
  );
}

export async function fakeSubmitForm2(params: any) {
  if (params.chip1Num === null) params.chip1Num = 0;
  if (params.chip2Num === null) params.chip2Num = 0;
  if (params.chip3Num === null) params.chip3Num = 0;

  return request(
    '/api/upstream/produce?' +
      'userId=' +
      params.userId +
      '&chip1Num=' +
      params.chip1Num +
      '&chip2Num=' +
      params.chip2Num +
      '&chip3Num=' +
      params.chip3Num,
    {
      method: 'POST',
      data: params,
    },
  );
}

export async function fakeSubmitForm3(params: any) {
  if (params.loan === null) params.loan = 0;

  return request('/api/upstream/loan?' + 'userId=' + params.userId + '&loan=' + params.loan, {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm4(params: any) {
  if (params.repay === null) params.repay = 0;

  return request('/api/upstream/repay?' + 'userId=' + params.userId + '&repay=' + params.repay, {
    method: 'POST',
    data: params,
  });
}
