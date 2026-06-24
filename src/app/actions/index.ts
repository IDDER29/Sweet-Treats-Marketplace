"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action") as string;
  await signIn(action, { redirectTo: "/business/profile" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/auth/login" });
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch {
    throw new Error("Authentication failed");
  }
}
