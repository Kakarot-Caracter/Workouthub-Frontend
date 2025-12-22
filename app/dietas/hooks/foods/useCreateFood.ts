// hooks/foods/useCreateFood.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { FoodI } from "@/app/shared/types";

interface CreateFoodParams {
  dietId: number;
  foodData: Partial<FoodI>;
}

export const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation<FoodI, Error, CreateFoodParams>({
    mutationFn: async ({ dietId, foodData }) => {
      const res = await fetch(`${API_URL}/diets/${dietId}/foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(foodData),
      });

      const text = await res.text();
      let payload;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        payload = text;
      }

      if (!res.ok) {
        console.error("API error response:", res.status, payload);
        const msg =
          payload && payload.message
            ? Array.isArray(payload.message)
              ? payload.message.join("; ")
              : payload.message
            : `HTTP ${res.status}`;
        throw new Error(msg);
      }

      return payload as FoodI;
    },
    onSuccess: (data, { dietId }) => {
      queryClient.invalidateQueries({ queryKey: ["foods", dietId] });
      queryClient.invalidateQueries({ queryKey: ["diets"] });
    },
    retry: 1,
  });
};
