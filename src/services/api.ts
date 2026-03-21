import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface FetchDataParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedData<T> {
  data: T[];
  totalCount: number;
}

export const fetchData = async <T>(endpoint: string, params: FetchDataParams): Promise<PaginatedData<T>> => {
  // json-server pagination: _page, _limit, _sort, _order, q
  const queryParams = new URLSearchParams();
  queryParams.append('_page', params.page.toString());
  queryParams.append('_limit', params.limit.toString());
  
  if (params.sortBy) {
    queryParams.append('_sort', params.sortBy);
    queryParams.append('_order', params.sortOrder || 'asc');
  }
  
  if (params.search) {
    queryParams.append('q', params.search);
  }

  const response = await api.get<T[]>(endpoint, {
    params: queryParams,
  });

  // json-server returns total count in headers
  const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
  
  return {
    data: response.data,
    totalCount,
  };
};

export default api;
