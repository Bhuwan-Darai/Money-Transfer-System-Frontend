import { api } from "@/lib/api";

export const fetchSenders = (params: any) => api.get("/senders", { params });

export const createSender = (data: any) => api.post("/senders", data);

export const updateSender = (id: string, data: any) =>
  api.put(`/senders/${id}`, data);

export const deleteSender = (id: string) => api.delete(`/senders/${id}`);
