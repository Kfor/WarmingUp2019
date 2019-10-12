import request from '@/utils/request';

export async function fakeSubmitForm1(params: any) {
  return request('/api/upstream/loan?' + 'userId=' + params.userId + '&loan=' + params.loan, {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm2(params: any) {
  console.log('wwww22222',params)
  return request('/api/upstream/produce?' + 'userId=' + 
    params.userId + '&chip1Num=' + params.chip1Num + '&chip2Num=' + 
    params.chip2Num + '&chip3Num=' + params.chip3Num,  {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm3(params: any) {
  return request('/api/upstream/invest?' + 'userId='+params.userId + '&TInvest='+params.TInvest + '&MInvest='+params.MInvest, {
    method: 'POST',
    data: params,
  });
}
