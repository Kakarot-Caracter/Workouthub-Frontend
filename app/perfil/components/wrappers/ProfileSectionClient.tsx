"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import ProfileSection from "../ProfileSection";
import ProtectedRoute from "@/lib/ProtectedRoute";

export function ProfileSectionClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute>
        <ProfileSection />
      </ProtectedRoute>
    </QueryClientProvider>
  );
}
