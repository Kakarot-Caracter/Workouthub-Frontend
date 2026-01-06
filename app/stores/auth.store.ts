"use client";

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
  logout: () => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    localStorage.setItem("token", data.token);
    set({ user: data.user, isAuth: true });
    return true;
  },

  register: async (username, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    localStorage.setItem("token", data.token);
    set({ user: data.user, isAuth: true });
    return true;
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuth: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ user: null, isAuth: false });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        set({ user: null, isAuth: false });
        return;
      }

      const user = await res.json();
      set({ user, isAuth: true });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      set({ user: null, isAuth: false });
    }
  },
}));
