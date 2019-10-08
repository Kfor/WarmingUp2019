import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params)
  return request('/api//top/fine?'+'userId='+ params.userId +'&fine='+ params.debt, {
    method: 'POST',
    data: params,
  });
}

