import request from '@/utils/request';

export async function queryBasicProfile() {
  return request('/api/top/test', {
    method: 'GET',
  });
}
