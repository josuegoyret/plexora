import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

function authMatcher(url: string): boolean {
  const { pathname } = new URL(url);

  const staticFilePattern =
    /\/_next|\/[^?]*\.(html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)(\?.*)?$/;
  const apiPattern = /^\/(api|trpc)/;

  // match api routes
  if (apiPattern.test(pathname)) return true;
  // don't match static files
  if (staticFilePattern.test(pathname)) return false;
  // match all other routes
  return true;
}

function handleCORSMiddleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "*");
    return response;
  }
  return NextResponse.next({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && authMatcher(req.url)) await auth.protect();

  return handleCORSMiddleware(req);
});

export const config = {
  matcher: "/:path*",
};
