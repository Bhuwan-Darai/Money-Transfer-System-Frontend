import { useQuery, useMutation } from "@tanstack/react-query";
import * as api from "@/api/transaction.api";

export const useTransactions = (params = {}) => {
  // List transactions
  const history = useQuery({
    queryKey: ["transactions", params],
    queryFn: () => api.getTransactions(params),
  });

  // Send money
  const send = useMutation({
    mutationFn: api.sendMoney,
  });

  // Single transaction
  const single = (id: string) =>
    useQuery({
      queryKey: ["transaction", id],
      queryFn: () => api.getTransactionById(id),
      enabled: !!id,
    });

  return {
    history,
    send,
    single,
  };
};
