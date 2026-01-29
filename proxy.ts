import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("__secure-rtk")?.value;
    const role = req.cookies.get("role")?.value?.toLowerCase();

    // if (path.startsWith("/_next") || path.startsWith("/favicon") || path.includes(".")) {
    //     return NextResponse.next();
    // }

    const isPublicPath = path === "/login" || path === "/signup" || path.startsWith("/forgotpassword");

    // console.log(`Proxy: ${path}, token: ${!!token}, role: ${role}, isPublicPath: ${isPublicPath}`);

    if (token && role && path === "/login") {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }

    if (isPublicPath) {
        return NextResponse.next();
    }
    
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    //  Dashboard role protection
    if (path.startsWith("/dashboard")) {
        if (!role) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (path.includes("/candidate") && role !== "candidate") {
            return NextResponse.redirect(new URL("/dashboard/recruiter", req.url));
        }

        if (path.includes("/recruiter") && role !== "recruiter") {
            return NextResponse.redirect(new URL("/dashboard/candidate", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    matcher: [
        "/dashboard/:path*",
        "/login",
        //   "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ],
};
