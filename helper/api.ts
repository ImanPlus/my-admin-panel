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

export async function handleGetAllUser() {
  const res = await fetch(`${BASE_URL}/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default async function handlePostNewUser(
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function handlePutUpdateUser(
  id: number,
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function handleDeleteUser(id: number) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

// ---------------------- Product
export async function handleGetAllProduct() {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function handlePostAddProduct(formData: any) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    cache: "no-store",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
