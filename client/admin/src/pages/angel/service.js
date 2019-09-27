import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/angel', {
    method: 'POST',
    data: params,
  });
}
