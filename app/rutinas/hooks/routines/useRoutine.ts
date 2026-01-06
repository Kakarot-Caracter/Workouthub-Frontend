import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { RoutineI } from "@/app/shared/types";

interface ResponseI {
  message: string;
  routines: RoutineI[];
}

export const useRoutines = () =>
  useQuery<ResponseI, Error>({
    queryKey: ["routines"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/routines`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar rutinas`);
      }

      return res.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
