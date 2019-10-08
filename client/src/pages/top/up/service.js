import request from '@/utils/request';

export async function fakeSubmitForm(params) {
    console.log(params)
    return request('/api/top/dealUpMiddle?' + 'upUserId=' + params.up_id + '&middleUserId='+ params.middle_id + '&quality=' + params.quality + '&price=' + params.price + '&num=' + params.count, {
      method: 'POST',
      data: params,
    });
}

