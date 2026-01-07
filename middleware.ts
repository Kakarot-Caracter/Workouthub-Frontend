// middleware.ts en la raíz
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

console.log("Middleware cargado en Next.js ✅");

export default function middleware(request: NextRequest) {
  console.log("Middleware ejecutado:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dietas/:path*", "/rutinas/:path*", "/perfil/:path*", "/login"],
};
