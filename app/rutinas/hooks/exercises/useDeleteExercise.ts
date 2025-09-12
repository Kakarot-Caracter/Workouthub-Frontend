// hooks/exercises/useDeleteExercise.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";

interface DeleteExerciseParams {
  routineId: number;
  exerciseId: number;
}

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteExerciseParams>({
    mutationFn: async ({ routineId, exerciseId }) => {
      const res = await fetch(
        `${API_URL}/routines/${routineId}/exercises/${exerciseId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status} al eliminar ejercicio`);
      }
    },
    onSuccess: (data, { routineId }) => {
      queryClient.invalidateQueries({ queryKey: ["exercises", routineId] });
      queryClient.invalidateQueries({ queryKey: ["routines"] });
    },
    retry: 1,
  });
};
