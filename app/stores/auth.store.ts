"use client";

import { create } from "zustand";
import { API_URL } from "../shared/constants/url-api";

type AuthState = {
  isAuth: boolean | null;
  user: { id: number; username: string; email: string } | null;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: null,
  user: null,

  checkAuth: async () => {
    try {
      const res = await fetch(`${API_URL}/user`, {
        credentials: "include",
      });

      if (!res.ok) {
        set({ isAuth: false, user: null });
        return;
      }

      const user = await res.json();
      set({ isAuth: true, user });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ isAuth: false, user: null });
    }
  },

  login: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      set({ isAuth: true, user: data.user });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ isAuth: false, user: null });
    }
  },
}));
