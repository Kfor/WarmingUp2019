import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/downstream/advertise?' + '&userId=' + params.userId + '&adInvest=' + params.AdInvest , {
    method: 'POST',
    data: params,
  });
}
