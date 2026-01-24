import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/api/sender.api";

const getErrorMessage = (error: any, fallback: string) => {
  const apiMessage = error?.response?.data?.message;
  return apiMessage || fallback;
};

export const useSenders = (params = {}) => {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["senders", params],
    queryFn: async () => {
      try {
        const response = await api.fetchSenders(params);
        return response.data.data;
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to fetch senders"));
        throw error;
      }
    },
    retry: 1,
  });

  const create = useMutation({
    mutationFn: async (payload: any) => {
      const response = await api.createSender(payload);
      toast.success("Sender created successfully");
      return response.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["senders"] }),
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to create sender")),
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: any) => {
      const response = await api.updateSender(id, data);
      toast.success("Sender updated successfully");
      return response.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["senders"] }),
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to update sender")),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.deleteSender(id);
      toast.success("Sender deleted successfully");
      return response.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["senders"] }),
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to delete sender")),
  });

  return { list, create, update, remove };
};
