import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/top/fine?userId=group' + params.userId + '&fine=' + params.fine, {
    method: 'POST',
    data: params,
  });
}
