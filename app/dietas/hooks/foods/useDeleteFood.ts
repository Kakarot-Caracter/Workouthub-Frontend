import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";

type DeleteFoodParams = {
  dietId: number;
  foodId: number;
};

export const useDeleteFood = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, DeleteFoodParams>({
    mutationFn: async ({ dietId, foodId }) => {
      const res = await fetch(`${API_URL}/diets/${dietId}/foods/${foodId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${res.status}`);
      }
    },
    onSuccess: (_, { dietId }) => {
      qc.invalidateQueries({ queryKey: ["foods", dietId] });
    },
    onError: (error) => {
      console.error("Error deleting food:", error);
    },
  });
};
