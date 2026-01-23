import { create } from "zustand";

interface OtpState {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useOtpStore = create<OtpState>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  clearEmail: () => set({ email: "" }),
}));
