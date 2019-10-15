import request from '@/utils/request';

export async function queryBasicProfile(params: any) {
  console.log('any',params)
  return request('/api/upstream/upprofile?userId='+params.userId,{
    method: 'GET',
    data: params,
  });
}
