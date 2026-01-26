import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import store from "./store/index.store";

// This function can be marked `async` if using `await` inside
export function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("__secure-rtk")?.value;
    const role = req.cookies.get("role")?.value?.toLowerCase();

    if (path.startsWith("/_next") || path.startsWith("/favicon") || path.includes(".")) {
        return NextResponse.next();
    }

    const isPublicPath = path === "/login" || path === "/signup" || path.startsWith("/forgotpassword");

    // uncomment in production
    // if (!isPublicPath && !token) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (path.startsWith("/dashboard")) {
        // If the path includes "candidate" but role is NOT candidate
        if (path.includes("/candidate") && role !== "candidate") {
            return NextResponse.redirect(new URL("/dashboard/recruiter", req.url));
        }

        // If the path includes "recruiter" but role is NOT recruiter
        if (path.includes("/recruiter") && role !== "recruiter") {
            return NextResponse.redirect(new URL("/dashboard/candidate", req.url));
        }
    }

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
