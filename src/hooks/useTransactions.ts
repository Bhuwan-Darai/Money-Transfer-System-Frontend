import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import * as api from "@/api/transaction.api";

const getErrorMessage = (error: any, fallback: string) => {
  const apiMessage = error?.response?.data?.message;
  return apiMessage || fallback;
};

export const useTransactions = (params = {}) => {
  const qc = useQueryClient();

  // List transactions
  const history = useQuery({
    queryKey: ["transactions", params],
    queryFn: async () => {
      const response = await api.getTransactions(params);
      return response.data;
    },
  });

  // Send money
  const send = useMutation({
    mutationFn: async (payload: {
      sender_id: string;
      receiver_id: string;
      amount_jpy: number;
    }) => {
      const response = await api.sendMoney(payload);
      toast.success("Transaction queued successfully");
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to send money")),
  });

  // Single transaction
  const single = (id: string) =>
    useQuery({
      queryKey: ["transaction", id],
      queryFn: async () => {
        const response = await api.getTransactionById(id);
        return response.data;
      },
      enabled: !!id,
    });

  return {
    history,
    send,
    single,
  };
};
