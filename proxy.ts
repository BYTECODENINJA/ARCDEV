import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const getRoutePath = (value: string | undefined, fallback: string) => {
  if (!value) {
    return fallback;
  }

  try {
    return new URL(value).pathname;
  } catch {
    return value;
  }
};

const signInRoute = getRoutePath(
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  "/sign-in"
);
const signUpRoute = getRoutePath(
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  "/sign-up"
);

const isPublicRoute = createRouteMatcher([
  `${signInRoute}(.*)`,
  `${signUpRoute}(.*)`,
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
}, {
  signInUrl: signInRoute,
  signUpUrl: signUpRoute,
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
