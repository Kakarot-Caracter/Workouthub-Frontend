"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import ProfileSection from "../ProfileSection";
import { queryClient } from "@/lib/queryClient";

export function ProfileSectionClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileSection />
    </QueryClientProvider>
  );
}
