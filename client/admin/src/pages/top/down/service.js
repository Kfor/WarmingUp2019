import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  // console.log(params)
  // console.log('222')
  console.log(params)
  return request('/api/top/dealDown', {
    method: 'POST',
    data: params,
  });
}
