import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuth = token !== undefined;

  console.log(isAuth);
  return NextResponse.next();
}
