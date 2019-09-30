import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params)
  return request('/api/top/dealMiddleDown?' + '&middleUserId=' + params.middle_id + '&downUserId=' + params.down_id + '&ka=' + params.performance + '&kb=' + params.appearance + '&kc=' + params.function + '&price=' + params.price +'&num='+params.count, {
    method: 'POST',
    data: params,
  });
}
