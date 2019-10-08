import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params)
  return request('/api/top/dealMiddleDown?'+'middleUserId='+params.middle_id+'&downUserId='+params.down_id+'&ka='+params.ka+'&kb='+params.appearance+'&kc='+params.function+'&price='+params.price+'&num='+params.num, {
    method: 'POST',
    data: params,
  });
}
