import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

const SIGN_IN_PATH = "/sign-in";
// Set the paths that don't require the user to be signed in
const publicPaths = ["/", `${SIGN_IN_PATH}*`, "/sign-up*", ""];

const isAPI = (path: string) => path.startsWith("/api");

const isPublic = (path: string) =>
  publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );

const runThisOnEveryFrontendRouteRequest = withClerkMiddleware(
  (request: NextRequest) => {
    /**
     * first check if the request is for an API route
     * if it is, we don't want to redirect the user to the sign in page
     * just let the request through and the API route will handle it
     */
    if (isAPI(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const isPublicPath = isPublic(request.nextUrl.pathname);

    if (isPublicPath) {
      return NextResponse.next();
    }
    // if the user is not signed in redirect them to the sign in page.
    const { userId } = getAuth(request);

    if (!userId) {
      // redirect the users to /pages/sign-in/[[...index]].ts

      const signInUrl = new URL(SIGN_IN_PATH, request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }
);

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
export default runThisOnEveryFrontendRouteRequest;
