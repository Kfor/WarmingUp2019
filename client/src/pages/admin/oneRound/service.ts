import request from '@/utils/request';

export async function fakeSubmitForm() {
  return request('/api/top/oneRound', {
    method: 'POST',
  });
}
