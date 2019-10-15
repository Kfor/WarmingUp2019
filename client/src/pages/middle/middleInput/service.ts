import request from '@/utils/request';

export async function fakeSubmitForm1(params: any) {
  return request('/api/middlestream/invest?' + 'userId='+params.userId + '&DInvest='+params.DInvest + '&KInvest='+params.KInvest, {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm2(params: any) {
  return request('/api/middlestream/produce?' + 'userId=' + params.userId + '&ka=' + params.ka + '&kb=' + params.kb + '&kc=' + params.kc+ '&amount='+params.amount, {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm3(params: any) {
  return request('/api/middlestream/loan?' + 'userId=' + params.userId + '&loan=' + params.loan, {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm4(params: any) {
  return request('/api/upstream/repay?' + 'userId=' + params.userId + '&repay=' + params.repay, {
    method: 'POST',
    data: params,
  });
}
