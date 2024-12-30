import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

// Middleware function with a more specific type for 'req'
export default function middleware(req: NextRequest) {
  return withAuth(req);
}

// Config to specify the matcher for the middleware
export const config = {
  matcher: ['/user/:path*'],
};
