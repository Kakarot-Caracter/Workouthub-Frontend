import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { DietI } from "@/app/shared/types";

interface ResponseI {
  message: string;
  diets: DietI[];
}

export const useDiets = () =>
  useQuery<ResponseI, Error>({
    queryKey: ["diets"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/diets`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar dietas`);
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
