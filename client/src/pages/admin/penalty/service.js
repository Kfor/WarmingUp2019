import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params)
  return request('/api/upstream/pebalty?'+'userId='+ params.userId +'fine='+ params.debt, {
    method: 'POST',
    data: params,
  });
}

