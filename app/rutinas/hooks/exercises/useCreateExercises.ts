// hooks/exercises/useCreateExercise.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import { ExerciseI } from "@/app/shared/types";

interface CreateExerciseParams {
  routineId: number;
  exerciseData: Partial<ExerciseI>;
}

export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation<ExerciseI, Error, CreateExerciseParams>({
    mutationFn: async ({ routineId, exerciseData }) => {
      const res = await fetch(`${API_URL}/routines/${routineId}/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(exerciseData),
      });

      const text = await res.text();
      let payload;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        payload = text;
      }

      if (!res.ok) {
        // Log para depuración en cliente
        console.error("API error response:", res.status, payload);
        // Construir mensaje legible
        const msg =
          payload && payload.message
            ? Array.isArray(payload.message)
              ? payload.message.join("; ")
              : payload.message
            : `HTTP ${res.status}`;
        throw new Error(msg);
      }

      return payload as ExerciseI;
    },
    onSuccess: (data, { routineId }) => {
      queryClient.invalidateQueries({ queryKey: ["exercises", routineId] });
      queryClient.invalidateQueries({ queryKey: ["routines"] });
    },
    retry: 1,
  });
};
