import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params);

  return request('/api/middlestream/produce?' + '&userId=' + params.userId + '&ka=' + params.chipValue + '&kb=' + params.TValue + '&kc=' + params.MValue + '&round=' + params.round, {
    method: 'POST',
    data: params,
  });
}