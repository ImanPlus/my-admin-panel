"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ---------------------- User
export async function handleLoginUser(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
