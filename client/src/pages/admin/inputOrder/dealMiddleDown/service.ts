import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request(
    '/api/top/dealMiddleDown?' +
      'middleUserId=group' +
      params.middle_id +
      '&downUserId=group' +
      params.down_id +
      '&ka=' +
      params.performance +
      '&kb=' +
      params.appearance +
      '&kc=' +
      params.function +
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
