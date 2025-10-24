import { useQuery } from "@tanstack/react-query";

import { API_URL } from "@/app/shared/constants/url-api";
import { UserI } from "@/app/shared/types";

export const useUsers = () =>
  useQuery<UserI[], Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/user/`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error ${res.status} al cargar usuario`);
      }
      return res.json();
    },
  });
