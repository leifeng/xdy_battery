import request, { requestCode } from '../utils/request';
import url from './api';
import { stringify } from 'qs'
export async function query(params) {
  return request(url + '/roleInfo/getPage?' + stringify(params), {
    method: 'get'
  });
}

export async function created(params) {
  return requestCode(url + '/roleInfo', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function remove(id) {
  return requestCode(url + '/roleInfo/' + id, {
    method: 'DELETE'
  });

}

export async function update(params) {
  return requestCode(url + '/roleInfo/' + params.id, {
    method: 'PUT',
    body: JSON.stringify(params),
  });

}

export function checkRoleName(account, cb) {
  fetch(url + '/roleInfo/checkRoleName?name=' + account)
    .then(res => res.json()).then(data => { cb(data) })
}

export async function queryByUserId(id) {
  return request(url + '/userRoleInfo/' + id, {
    method: 'get'
  });
}

export function setBindRole(roleIds) {
  console.log(roleIds)
  return requestCode(url + '/userRoleInfo/setBindRole', {
    method: 'POST',
    body:  JSON.stringify(roleIds),
  });
}
