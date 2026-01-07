"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/auth.store";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth().then((isAuth) => {
      if (!isAuth) router.push("/login");
    });
  }, [router, checkAuth]);

  return <>{children}</>;
}
