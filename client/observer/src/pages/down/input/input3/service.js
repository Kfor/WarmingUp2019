import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/downstream/advertise?' + 'userId=' + params.userId + '&adInvest=' + params.AdInvest , {
    method: 'POST',
    data: params,
  });
}
