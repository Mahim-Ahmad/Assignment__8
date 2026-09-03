import { createAuthClient } from "better-auth/react";

// No baseURL passed here on purpose: better-auth's client automatically
// uses the current page's origin (window.location.origin) when baseURL is
// omitted. That means this works correctly on localhost during development
// AND on whatever production domain the app is deployed to, without
// depending on a NEXT_PUBLIC_* env var being present at build time.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
