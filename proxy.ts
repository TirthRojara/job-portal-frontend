import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("__secure-rtk")?.value;
    const role = req.cookies.get("role")?.value;

    if (
        path.startsWith("/_next") ||
        path.startsWith("/favicon") ||
        path.includes(".")
    ) {
        return NextResponse.next();
    }

    const isPublicPath =
        path === "/login" ||
        path === "/signup" ||
        path.startsWith("/forgotpassword");

    // if (!isPublicPath && !token) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    if (token && path === "/login") {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: "/dashboard/:path*",
};
