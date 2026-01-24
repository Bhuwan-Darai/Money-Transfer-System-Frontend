// hooks/useClients.ts
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useClients = (page: number, limit: number, search?: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["clients", page, limit, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      const res = await api.get(`/admin/get-clients?${params.toString()}`);
      return res.data;
    },
    enabled: !!page && !!limit,
  });

  return { data, isLoading, refetch };
};
