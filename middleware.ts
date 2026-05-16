import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession, ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminPage) {
    return NextResponse.next();
  }

  if (isLoginPage) {
    const token = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
    const session = await verifyAdminSession(token);

    if (session) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);

  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
