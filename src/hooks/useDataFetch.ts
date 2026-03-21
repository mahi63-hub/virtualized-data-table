import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchData, FetchDataParams, PaginatedData } from '../services/api';

export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  role: string;
  status: string;
}

export const useDataFetch = (params: FetchDataParams) => {
  return useQuery<PaginatedData<User>, Error>({
    queryKey: ['users', params],
    queryFn: () => fetchData<User>('/users', params),
    placeholderData: keepPreviousData, // Replaces keepPreviousData: true in v5
    staleTime: 5000,
  });
};
