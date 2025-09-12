// hooks/exercises/useUpdateExercise.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import { ExerciseI } from "@/app/shared/types";

interface UpdateExerciseParams {
  routineId: number;
  exerciseId: number;
  exerciseData: Partial<ExerciseI>;
}

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation<ExerciseI, Error, UpdateExerciseParams>({
    mutationFn: async ({ routineId, exerciseId, exerciseData }) => {
      const res = await fetch(
        `${API_URL}/routines/${routineId}/exercises/${exerciseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(exerciseData),
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status} al actualizar ejercicio`);
      }

      return res.json();
    },
    onSuccess: (data, { routineId }) => {
      queryClient.invalidateQueries({ queryKey: ["exercises", routineId] });
      queryClient.invalidateQueries({ queryKey: ["routines"] });
    },
    retry: 1,
  });
};
