import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params)
  return request('/api/upstream/fine?' + '&userId=' + params.userId +'&fine='+ params.debt, {
    method: 'POST',
    data: params,
  });
}

