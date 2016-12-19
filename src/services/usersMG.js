import request, { requestCode } from '../utils/request';
import url from './api';
import { stringify } from 'qs'

export async function query(params) {
  return request(url + '/userInfo/getPage?' + stringify(params), {
    method: 'get'
  });
}


export async function created(params) {
  return requestCode(url + '/userInfo', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export async function remove(id) {
  return requestCode(url + '/userInfo', {
    method: 'DELETE',
  })
}

export async function removeIds(ids) {
  return requestCode(url + '/userInfo/batchDelete', {
    method: 'POST',
    body: JSON.stringify(ids)
  })
}

export async function update(params) {
  return requestCode(url + '/userInfo' + params.id, {
    method: 'PUT',
    body: JSON.stringify(params),
  })

}

export function checkAcount(account, cb) {
  fetch(url + '/userInfo/checkAcount?account=' + account)
    .then(res => res.json()).then(data => { cb(data) })
}
