"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import ProfileSection from "../ProfileSection";

export function ProfileSectionClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileSection />
    </QueryClientProvider>
  );
}
