import request, { requestCode } from '../utils/request';
import url from './api';
import { stringify } from 'qs'

export async function query(params) {
  return request(url + '/pubProgramInfo/getPage?' + stringify(params), {
    method: 'get'
  });
}


export async function created(params) {
  const options = {
    method: 'POST',
    body: JSON.stringify(params),
  }
  return requestCode(url + '/pubProgramInfo', options)
}

export async function remove(id) {
  const options = {
    credentials: 'include',
    method: 'DELETE',
  }
  return fetch(url + '/pubProgramInfo/' + id, options)
    .then(res => {
      if (res.status === 200) {
        return 'success'
      }
      return res.status
    })
}

export async function update(params) {
  const options = {
    credentials: 'include',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }
  return fetch(url + '/pubProgramInfo/' + params.id, options)
    .then(res => {
      if (res.status === 200) {
        return 'success'
      }
      return res.status
    })
}

export function checkAcount(account, cb) {
  fetch(url + '/pubProgramInfo/checkAcount?account=' + account)
    .then(res => res.json()).then(data => { cb(data) })
}
