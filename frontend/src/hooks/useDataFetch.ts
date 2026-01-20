import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api";

export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export function useDataFetch() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await apiClient.get<User[]>("/users");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
