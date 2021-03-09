export type TableListItem = {
  uuid: string;
  first_name: string;
  last_name: string;
  emails: string;
  phones: string;
  gender: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  linkedinURL: string;
  facebookURL: string;
  birthday: string;
  job_function: string;
  job_level: string;
  job_title: string;
  business_name: string;
  business_categories: string;
  business_address: string;
  business_city: string;
  business_postal_code: string;
  business_country: string;
  num_employees: string;
  revenue_currency: string;
  revenue_min: string;
  revenue_max: string;
  websites: string;
  custom_fields?: {
    json;
    key;
    no_structure;
  };
  updated_at: Date;
  created_at: Date;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  uuid?: string;
  first_name?: string;
  last_name?: string;
  emails?: string;
  phones?: string;
  gender?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  linkedinURL?: string;
  facebookURL?: string;
  birthday?: string;
  job_function?: string;
  job_level?: string;
  job_title?: string;
  business_name?: string;
  business_categories?: string;
  business_address?: string;
  business_city?: string;
  business_postal_code?: string;
  business_country?: string;
  num_employees?: string;
  revenue_currency?: string;
  revenue_min?: string;
  revenue_max?: string;
  websites?: string;
  custom_fields?: {
    json: string;
    key: string;
    no_structure: string;
  };
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
