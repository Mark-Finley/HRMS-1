import { create } from "zustand";
import type { Role, User } from "../types/user";
import { mockUsers } from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (role) =>
    set({
      isAuthenticated: true,
      user: mockUsers[role],
    }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
