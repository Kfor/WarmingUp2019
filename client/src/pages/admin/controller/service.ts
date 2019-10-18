import request from '@/utils/request';

export async function fakeSubmitForm1(params: any) {
  return request('api/top/reset', {
    method: 'POST',
    data: params,
  });
}

export async function fakeSubmitForm2(params: any) {
  return request('api/top/oneRound', {
    method: 'POST',
    data: params,
  });
}
