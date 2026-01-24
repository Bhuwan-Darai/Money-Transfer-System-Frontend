import { api } from "@/lib/api";

// Get all receivers (paginated + search)
export const fetchReceivers = (params: {
  page?: number;
  limit?: number;
  search?: string;
}) => api.get("/receivers", { params });

// Get single receiver
export const getReceiverById = (id: string) => api.get(`/receivers/${id}`);

// Create receiver
export const createReceiver = (data: any) => api.post("/receivers", data);

// Update receiver
export const updateReceiver = (id: string, data: any) =>
  api.put(`/receivers/${id}`, data);

// Delete receiver
export const deleteReceiver = (id: string) => api.delete(`/receivers/${id}`);
