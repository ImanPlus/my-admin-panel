import { auth } from "./auth";
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggin = !!req.auth;
  const { pathname } = req.nextUrl;

  if (!isLoggin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  if (isLoggin && pathname.startsWith("/authentication")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  NextResponse.next();
});

export const config = {
  matcher: ["/authentication/:path*", "/dashboard/:path*"],
};
