"use client";

import { useAuthStore } from "@/app/stores/auth.store";
import { useEffect } from "react";

export function AuthInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return null;
}
