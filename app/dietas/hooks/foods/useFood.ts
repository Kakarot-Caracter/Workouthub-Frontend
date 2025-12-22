import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { FoodI } from "@/app/shared/types";

interface ResponseI {
  foods: FoodI[];
}

export const useFoods = (dietId: number) =>
  useQuery<ResponseI, Error>({
    queryKey: ["foods", dietId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/diets/${dietId}/foods`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar alimentos`);
      }

      return res.json();
    },
    enabled: !!dietId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
