import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params);

  return request('/api/middlestream/invest?' + '&userId='+params.userId + '&MInvest='+params.AInvest + '&KInvest='+params.BInvest, {
    method: 'POST',
    data: params,
  });
}
