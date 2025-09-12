// hooks/exercises/useExercise.ts
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import { ExerciseI } from "@/app/shared/types";

export const useExercises = (routineId: number) =>
  useQuery<ExerciseI[], Error>({
    queryKey: ["exercises", routineId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/routines/${routineId}/exercises`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar ejercicios`);
      }
      return res.json();
    },
    enabled: Number.isInteger(routineId) && routineId > 0,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
