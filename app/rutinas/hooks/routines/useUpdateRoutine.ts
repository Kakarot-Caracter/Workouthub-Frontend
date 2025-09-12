import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { RoutineI } from "@/app/shared/types";

export type UpdateRoutine = Partial<Pick<RoutineI, "name" | "description">>;

type UpdateRoutineParams = {
  id: number;
  payload: UpdateRoutine;
};

export const useUpdateRoutine = () => {
  const qc = useQueryClient();

  return useMutation<RoutineI, Error, UpdateRoutineParams>({
    mutationFn: async ({ id, payload }) => {
      const res = await fetch(`${API_URL}/routines/${id}`, {
        method: "PATCH",
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
      console.error("Error updating routine:", error);
    },
  });
};
