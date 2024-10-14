import type { NextRequest } from "next/server";
import { track } from "@vercel/analytics/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await track("ui-components", {
    url: request.url,
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/registry/:path*",
};
