import { API_URL } from "@/app/shared/constants/url-api";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const res = await fetch(`${API_URL}/user`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
