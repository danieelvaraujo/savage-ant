import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/big-data', {
    params,
  });
}

export async function removeRule(params: { uuid: string[] }) {
  let idDelete = params.uuid[0];
  return request(`/big-data/${idDelete}`, {
    method: 'DELETE',
  });
}

export async function addRule(params: TableListItem) {
  return request('/big-data', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
