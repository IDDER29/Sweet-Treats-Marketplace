// Clean axios client for the external REST API.
//
// Replaces the inconsistent, broken auth wiring that existed before
// (`Bearer ${session}` -> "[object Object]", and `Bearer ${JSON.stringify(
// session)}` in others). One instance, one consistent token.
//
// NOTE: this module imports next-auth's `auth()` and is therefore
// server-only. Import it from server actions / route handlers, never from
// client components.

import axios, { AxiosInstance } from "axios";
import { auth } from "@/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

/** Server-side axios instance with the caller's auth token attached. */
export async function getServerApi(): Promise<AxiosInstance> {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 10_000,
  });

  const session = await auth();
  const user = session?.user as { id?: string } | undefined;
  // TODO(security): the backend has no real access token yet, so we fall
  // back to the user id as the legacy code did. IDs are not secrets —
  // replace with a backend-issued JWT (session.accessToken) when available.
  const token =
    (session as { accessToken?: string } | null)?.accessToken ?? user?.id;
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance;
}

/** Public (unauthenticated) axios instance for endpoints that need no auth. */
export const publicApi: AxiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});
