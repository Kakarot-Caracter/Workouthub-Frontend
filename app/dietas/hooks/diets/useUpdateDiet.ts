import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { DietI } from "@/app/shared/types";

export type UpdateDiet = Partial<Pick<DietI, "name">>;

type UpdateDietParams = {
  id: number;
  payload: UpdateDiet;
};

export const useUpdateDiet = () => {
  const qc = useQueryClient();

  return useMutation<DietI, Error, UpdateDietParams>({
    mutationFn: async ({ id, payload }) => {
      const res = await fetch(`${API_URL}/diets/${id}`, {
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
      qc.invalidateQueries({ queryKey: ["diets"] });
    },
    onError: (error) => {
      console.error("Error updating diet:", error);
    },
  });
};
