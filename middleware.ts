import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Log simple
  console.log("Middleware ejecutado:");
  console.log("Pathname:", pathname);
  console.log("Token:", token);

  const protectedPaths = ["/dietas", "/rutinas", "/perfil"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    console.log("Redirigiendo a /login porque no hay token");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/login") {
    console.log(
      "Usuario logueado intentando entrar a /login, redirigiendo a /",
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Permitiendo acceso a la ruta");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dietas/:path*", "/rutinas/:path*", "/perfil/:path*", "/login"],
};
