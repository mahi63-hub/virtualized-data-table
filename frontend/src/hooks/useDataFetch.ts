import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/api";
import type { FetchDataParams, PaginatedResponse } from "../services/api";

export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export function useDataFetch(params: FetchDataParams) {
  return useQuery<PaginatedResponse<User>, Error>({
    queryKey: ["users", params],
    queryFn: () => fetchUsers<User>(params),
    keepPreviousData: true,
  });
}
