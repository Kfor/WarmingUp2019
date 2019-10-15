import request from '@/utils/request';

export async function query(): Promise<any> {
  console.log('apiusers');
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  console.log('apicurrentuser');
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  console.log('apinotices');
  return request('/api/notices');
}
