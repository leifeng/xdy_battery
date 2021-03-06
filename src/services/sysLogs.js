import request, { requestCode } from '../utils/request';
import url from './api';
import { stringify } from 'qs'

export async function query(params) {
  return request(url + '/pubLogInfo/getPage?'+stringify(params), {
    method: 'get'
  });
}
