import { getSession } from "next-auth/react";
async function apiFetch(endpoint, options = {}) {
  const session = await getSession();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://al-shifa-clinic-backend.onrender.com" : "http://localhost:5000");
  const headers = new Headers(options.headers || {});
  if (session?.user?.id) {
    headers.set("x-user-id", session.user.id);
  }
  if (session?.user?.role) {
    headers.set("x-user-role", session.user.role);
  }
  if (options.body && typeof options.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
}
export {
  apiFetch
};
