import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  // console.log(params)
  // console.log('222')
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
