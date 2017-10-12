import request from '../utils/request';
import { PAGE_SIZE,API } from '../constants';
//分页
export function fetch({ page }) {
  return request(`${API}/api/users/GetPage?pageIndex=${page}&pageSize=${PAGE_SIZE}`,{
  });
}
export function getMenu() {
  return request(`${API}/api/users/GetMenu`,{
  });
}
export function remove(id) {
  return request(`${API}/api/users/delete?id=${id}`);
}
//修改
export function patch(id, values) {
  var data = new FormData();
  data.append('id', id);
  data.append('name', values.name);
  data.append('email', values.email);
  data.append('website', values.website);
  return request(`${API}/api/users/Update`, {
    'method': 'post',
    'body': data
  });
}
//新增
export function create(values) {
  var data = new FormData();
  data.append('name', values.name);
  data.append('email', values.email);
  data.append('website', values.website);
  return request(`${API}/api/users/Add`,
    {
      'method': 'post',
      'body': data
    }
  )
}


