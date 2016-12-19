import request, { requestCode } from '../utils/request';
import url from './api';
import { stringify } from 'qs'

export async function query(params) {
  return request(url + '/recycleStockInfo/getPage?' + stringify(params), {
    method: 'get'
  });
}


export async function created(params) {
  const options = {
    method: 'POST',
    body: JSON.stringify(params),
  }
  return requestCode(url + '/recycleStockInfo', options)
}
