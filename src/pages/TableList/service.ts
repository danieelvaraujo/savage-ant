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
  console.log(params);
  return request('/big-data', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: TableListParams) {
  let idUpdate = params.uuid;
  return request(`/big-data/${idUpdate}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function uploadData(file: File) {
  return request('/big-data/import', {
    method: 'POST',
    data: {
      ...file,
    },
  });
}
