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
  disabled?: boolean;
  href: string;
  // avatar: string;
  // name: string;
  // owner: string;
  // desc: string;
  // callNo: number;
  // status: number;
  updated_at: Date;
  created_at: Date;
  // progress: number;
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
  last_name?: string;
  city?: string;
  country?: string;
  gender?: string;
  job_function?: string;
  job_level?: string;
  sort_term?: string;
  // filter?: Record<string, any[]>;
  // sorter?: Record<string, any>;
};
