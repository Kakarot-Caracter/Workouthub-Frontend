import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { RoutineI } from "@/app/shared/types";

// Payload para crear rutina
export type CreateRoutine = Pick<RoutineI, "name" | "description">;

export const useCreateRoutine = () => {
  const qc = useQueryClient();

  return useMutation<RoutineI, Error, CreateRoutine>({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_URL}/routines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${res.status}`);
      }

      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["routines"] });
    },
    onError: (error) => {
      console.error("Error creating routine:", error);
    },
  });
};
