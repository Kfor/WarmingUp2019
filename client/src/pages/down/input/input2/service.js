import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params);

  return request('/api/downstream/sell?' + '&userId=' + params.userId + '&ka=' + params.chipValue + '&kb=' + params.TValue + '&kc=' + params.MValue + '&price=' + params.price + '&amount=' + params.amount + '&round=' + params.round, {
    method: 'POST',
    data: params,
  });
}
