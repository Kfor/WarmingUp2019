import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params);

  return request('/middlestream/produce?' + 'userId=' + params.userId + '&ka=' + params.chipValue + '&kb=' + params.TValue + '&kc=' + params.MValue, {
    method: 'POST',
    data: params,
  });
}