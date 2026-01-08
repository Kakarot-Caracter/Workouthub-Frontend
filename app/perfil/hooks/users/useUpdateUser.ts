import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/app/shared/constants/url-api";
import type { UserI } from "@/app/shared/types";

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

type UpdateContext = {
  previousUser?: UserI;
};

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation<UserI, Error, UpdateUser, UpdateContext>({
    mutationFn: async (payload) => {
      const res = await fetch(`${API_URL}/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${res.status}`);
      }

      return res.json();
    },

    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: ["user"] });

      const previousUser = qc.getQueryData<UserI>(["user"]);

      qc.setQueryData<UserI>(["user"], (old) =>
        old ? { ...old, ...payload } : old,
      );

      return { previousUser };
    },

    onError: (_err, _payload, ctx) => {
      if (ctx?.previousUser) {
        qc.setQueryData(["user"], ctx.previousUser);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
