"use client";

import { useAuthStore } from "@/app/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuth === false) {
      router.replace("/login");
    }
  }, [isAuth]);

  if (isAuth === null) return null;

  return children;
}
