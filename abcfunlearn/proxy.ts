import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify-email",
    "/api/webhooks/clerk",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!isPublicRoute) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:css|js|png|jpg|jpeg|svg|ico|webp)).*)",
    "/(api|trpc)(.*)",
  ],
};
