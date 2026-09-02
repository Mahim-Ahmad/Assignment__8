import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export async function GET(request) {
  const auth = await getAuth();
  const { GET: handler } = toNextJsHandler(auth);
  return handler(request);
}

export async function POST(request) {
  const auth = await getAuth();
  const { POST: handler } = toNextJsHandler(auth);
  return handler(request);
}
