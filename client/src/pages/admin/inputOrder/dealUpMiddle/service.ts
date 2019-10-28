import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request(
    '/api/top/dealUpMiddle?' +
      'upUserId=group' +
      params.up_id +
      '&middleUserId=group' +
      params.middle_id +
      '&quality=' +
      params.quality +
      '&price=' +
      params.price +
      '&num=' +
      params.count,
    {
      method: 'POST',
      data: params,
    },
  );
}
