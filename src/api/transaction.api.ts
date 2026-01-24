import { api } from "@/lib/api";

// Send money
export const sendMoney = (data: { receiver_id: string; amount_jpy: number }) =>
  api.post("/transactions/send", data);

// User transaction history
export const getTransactions = (params: {
  page?: number;
  limit?: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}) => api.get("/transactions", { params });

// Single transaction
export const getTransactionById = (id: string) =>
  api.get(`/transactions/${id}`);

// Admin: all transactions
export const getAllTransactions = (params: any) =>
  api.get("/admin/transactions", { params });
