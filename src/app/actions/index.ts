"use server";

import { signIn, signOut } from "@/auth";
export async function doSocialLogin(formData: any) {
  const action = formData.get("action");

  await signIn(action, { redirectTo: "/business/profile" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/auth/login" });
}

export async function doCredentialLogin(formData: any) {
  try {
    // Extract form data into an object
    const email = formData.get("email");
    const password = formData.get("password");

    // Pass the extracted values to signIn
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      console.error("Login error:", response.error);
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}
