import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryContato(params: TableListParams) {
  if (params.pesquisar) {
    const searchParam = params.pesquisar;
    return request(`/big-data?search_term=${searchParam}`);
  } else {
    return request(`/big-data`);
  }
}

export async function queryContatoParam(params: string) {
  return request(`/big-data?search_term=${params}`);
}

export async function removeContato(params: { uuid: string }) {
  let idDelete = params.uuid;
  return request(`/big-data/${idDelete}`, {
    method: 'DELETE',
  });
}

export async function addContato(params: TableListItem) {
  console.log(params);
  return request('/big-data', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateContato(params: TableListParams) {
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
