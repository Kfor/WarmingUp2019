import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params);

  return request('/api/upstream/debt?' + '&userId=' + params.userId + '&debt=' + params.loan, {
    method: 'POST',
    data: params,
  });
}


