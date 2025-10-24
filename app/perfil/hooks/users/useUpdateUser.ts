import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import { UserI } from "@/app/shared/types";

export type UpdateUser = Partial<
  Pick<
    UserI,
    | "username"
    | "email"
    | "height"
    | "age"
    | "weight"
    | "gender"
    | "weeklyActivity"
  >
>;

// PATCH a /user/profile (ajusta si tu endpoint es otro)
export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation<UserI, Error, UpdateUser>({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_URL}/user/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // intenta leer JSON con message, si falla usa status
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${res.status}`);
      }

      return res.json();
    },
    onSuccess: (updatedUser) => {
      // Actualiza la cache ["user"] para que componentes que usan useUsers
      qc.setQueryData(["user"], (oldData: unknown) => {
        if (!oldData) return [updatedUser];
        if (Array.isArray(oldData)) {
          return oldData.map((u: UserI) =>
            u.id === updatedUser.id ? updatedUser : u,
          );
        }
        return updatedUser;
      });

      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
