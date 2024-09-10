import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export const middleware = (req) => {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  if (!token) {
    if (path.includes("new") || path.includes("chat"))
      return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    const decodedToken = decodeJwt(token);

    // If already logged in; redirect to home page
    if (token && ["/", "/login"].includes(path)) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    // If a no vendor user tries to access these pages, redirect to profile
    const isVendor = decodedToken.roles.includes("vendor");
    if (["/hotels/new", "/transports/new"].includes(path) && !isVendor) {
      return NextResponse.redirect(
        new URL(`/profile?userId=${decodedToken.userId}`, req.url)
      );
    }

    const isAdmin = decodedToken.roles.includes("admin");

    // If not admin, don't allow to access admin dashboard
    if (path.includes("admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    // If admin tries to access vendor pages, redirect to home
    if (path.includes("new") && isAdmin) {
      return NextResponse.redirect(new URL("/admin/destinations", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
