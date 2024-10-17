import type { NextRequest } from "next/server";
import { track } from "@vercel/analytics/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/registry") && pathname.endsWith(".json")) {
    await track("ui-components", {
      url: pathname,
    });
  }
}

export const config = {
  matcher: "/registry/:path*",
};
