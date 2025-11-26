import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const isLoggin = !!req.auth;
  const { pathname } = req.nextUrl;

  console.log('req', req)

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  if (!isLoggin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  if (isLoggin && pathname.startsWith("/authentication")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  NextResponse.next();
});

export const config = {
  matcher: ["/authentication/:path*", "/dashboard/:path*", "/"],
};
