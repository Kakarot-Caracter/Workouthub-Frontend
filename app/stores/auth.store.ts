import { create } from "zustand";
import { API_URL } from "@/app/shared/constants/url-api";

type User = { id: number; username: string; email: string };

type AuthState = {
  user: User | null;
  isAuth: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const user = await res.json();
    set({ user, isAuth: true });
    return true;
  },

  register: async (username, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) return false;

    const user = await res.json();
    set({ user, isAuth: true });
    return true;
  },

  logout: async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    set({ user: null, isAuth: false });
  },

  checkAuth: async () => {
    if (typeof window === "undefined") return;

    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      set({ user: null, isAuth: false });
      return;
    }

    const user = await res.json();
    set({ user, isAuth: true });
  },
}));
