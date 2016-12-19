import { requestCode } from '../utils/request';
import url from './api';

export async function query(params) {
  return requestCode(url + '/login', {
    method: 'POST',
    body: JSON.stringify(params)
  })
}
