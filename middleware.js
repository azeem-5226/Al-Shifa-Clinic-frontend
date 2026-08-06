import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/doctor/dashboard", req.url));
    }

    if (pathname.startsWith("/doctor") && token.role !== "doctor") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Default redirect if someone hits /dashboard directly
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(`/${token.role}/dashboard`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/dashboard",
    "/settings"
  ],
};
