import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/api/receiver.api";

const getErrorMessage = (error: any, fallback: string) => {
  const apiMessage = error?.response?.data?.message;
  return apiMessage || fallback;
};

export const useReceivers = (params = {}) => {
  const qc = useQueryClient();

  // List
  const list = useQuery({
    queryKey: ["receivers", params],
    queryFn: async () => {
      try {
        const response = await api.fetchReceivers(params);
        return response.data.data;
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to fetch receivers"));
        throw error;
      }
    },
    retry: 1,
  });

  // Create
  const create = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.createReceiver(payload);
      toast.success("Receiver created successfully");
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["receivers"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to create receiver")),
  });

  // Update
  const update = useMutation({
    mutationFn: async ({ id, data }: any) => {
      const response = await api.updateReceiver(id, data);
      toast.success("Receiver updated successfully");
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["receivers"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to update receiver")),
  });

  // Delete
  const remove = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.deleteReceiver(id);
      toast.success("Receiver deleted successfully");
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["receivers"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to delete receiver")),
  });

  return {
    list,
    create,
    update,
    remove,
  };
};
