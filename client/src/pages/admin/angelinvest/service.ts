import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request(
    '/api/top/angelInvest?' + 'userId=' + params.userId + '&angelInvest=' + params.money,
    {
      method: 'POST',
      data: params,
    },
  );
}
