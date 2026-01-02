import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Páginas a las que no puede entrar si ya está autenticado
const PUBLIC_PAGES = ["/login", "/register"];

// Páginas que requieren autenticación
const PRIVATE_PAGES = ["/rutinas", "/perfil", "/dietas"];

export function middleware(req: NextRequest) {
  // Leer cookie httpOnly
  const token = req.cookies.get("auth_token")?.value;

  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PAGES.some((path) => pathname.startsWith(path));
  const isPrivate = PRIVATE_PAGES.some((path) => pathname.startsWith(path));

  // Si está autenticado y va a login/register → redirigir a home (/)
  if (token && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Si no está autenticado y quiere entrar a una privada → redirigir a /login
  if (!token && isPrivate) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configurar matcher
export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/rutinas/:path*", // protegemos /rutinas
    "/perfil/:path*", // protegemos /perfil
  ],
};
