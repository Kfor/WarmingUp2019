import request from '@/utils/request';

export async function queryBasicProfile() {
  return request('/api/top/topprofile', {
    method: 'GET',
  });
}
