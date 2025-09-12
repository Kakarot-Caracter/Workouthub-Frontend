import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";

export const useDeleteRoutine = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/routines/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${res.status}`);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["routines"] });
    },
    onError: (error) => {
      console.error("Error deleting routine:", error);
    },
  });
};
