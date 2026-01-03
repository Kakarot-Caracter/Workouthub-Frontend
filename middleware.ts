import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PAGES = ["/login", "/register"];

const PRIVATE_PAGES = ["/rutinas", "/perfil", "/dietas"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PAGES.some((path) => pathname.startsWith(path));
  const isPrivate = PRIVATE_PAGES.some((path) => pathname.startsWith(path));

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

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/rutinas/:path*",
    "/perfil/:path*",
    "/dietas/:path*",
  ],
};
