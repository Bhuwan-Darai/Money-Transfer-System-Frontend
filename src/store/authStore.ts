import type { User } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (user: User, token: string) => void;
  logout: () => void;
}

type EmailStore = {
  email: string;
  setEmail: (email: string) => void;
};

export const useAuthStore = create<AuthState & EmailStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      register: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      email: "",
      setEmail: (email: string) => {
        set({ email });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
