import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export interface FetchDataParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  search: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}

export async function fetchUsers<T>(
  params: FetchDataParams
): Promise<PaginatedResponse<T>> {
  const { page, limit, sortBy, sortOrder, search } = params;

  const queryParams: Record<string, any> = {
    _page: page,
    _limit: limit,
    _sort: sortBy,
    _order: sortOrder,
  };

  if (search.trim()) {
    queryParams.q = search;
  }

  const response = await apiClient.get<T[]>("/users", {
    params: queryParams,
  });

  // ?? Browser may block x-total-count (CORS)
  let totalCount = Number(response.headers["x-total-count"]);

  if (!totalCount) {
    // fallback: fetch total count separately
    const countResponse = await apiClient.get<T[]>("/users", {
      params: search.trim() ? { q: search } : {},
    });
    totalCount = countResponse.data.length;
  }

  return {
    data: response.data,
    totalCount,
  };
}
