import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  console.log(params)
  return request('/api/top/angelInvest?' + '&userId=' + params.id_object +'&money='+params.money, {
    method: 'POST',
    data: params,
  });
}
