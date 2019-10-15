import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/top/dealDown', {
    method: 'POST',
    data: params,
  });
}
