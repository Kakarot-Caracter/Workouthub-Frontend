"use client";

import { create } from "zustand";
import { API_URL } from "../shared/constants/url-api";

type User = { id: number; username: string; email: string };

type AuthStore = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      set({ user: data.user });
      return true;
    }
    return false;
  },

  register: async (username, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      set({ user: data.user });
      return true;
    }
    return false;
  },

  logout: async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    set({ user: null });
  },

  checkAuth: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: "include",
    });

    if (res.ok) {
      const user = await res.json();
      set({ user });
      return true;
    }
    set({ user: null });
    return false;
  },
}));
