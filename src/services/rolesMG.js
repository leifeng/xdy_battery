import request from '../utils/request';
import { parse, stringify } from 'qs';
export async function query(params) {
  return request(`/api/roles?${stringify(params)}`);
}
export async function create(params) {
  return request('/api/roles', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/roles', {
    method: 'delete',
    body: stringify(params),
  });
}
export async function removes(params) {
  return request('/api/roles', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return request('/api/roles', {
    method: 'put',
    body: JSON.stringify(params),
  });
}
