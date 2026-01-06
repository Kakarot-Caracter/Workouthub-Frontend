"use client";

import { useAuthStore } from "@/app/stores/auth.store";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, [checkAuth]);

  return <>{children}</>;
}
