import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params);

  return request('/api/middlestream/loan?' + '&userId=' + params.userId + '&loan=' + params.loan, {
    method: 'POST',
    data: params,
  });
}