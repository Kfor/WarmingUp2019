import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/upstream/debt', {
    method: 'POST',
    data: params,
  });
}
