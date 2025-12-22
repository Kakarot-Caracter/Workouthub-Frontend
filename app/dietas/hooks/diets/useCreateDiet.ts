import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { DietI } from "@/app/shared/types";

// Payload para crear dieta
export type CreateDiet = Pick<DietI, "name">;

export const useCreateDiet = () => {
  const qc = useQueryClient();

  return useMutation<DietI, Error, CreateDiet>({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_URL}/diets`, {
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
      qc.invalidateQueries({ queryKey: ["diets"] });
    },
    onError: (error) => {
      console.error("Error creating diet:", error);
    },
  });
};
