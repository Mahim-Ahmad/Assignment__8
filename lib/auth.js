import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

let authInstance = null;
let authPromise = null;

// Lazily build the better-auth instance only once MongoDB is actually
// connected. This avoids a race where the OAuth callback tries to write
// the user/account before the Mongo connection is ready (which better-auth
// surfaces as a generic "invalid_code" error), and also avoids needing a
// live DB connection at build time.
async function getAuth() {
  if (authInstance) return authInstance;

  if (!authPromise) {
    authPromise = (async () => {
      const client = await clientPromise;
      const db = client.db();

      authInstance = betterAuth({
        database: mongodbAdapter(db, { client }),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
        emailAndPassword: {
          enabled: true,
        },
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        },
      });

      return authInstance;
    })();
  }

  return authPromise;
}

export { getAuth };
