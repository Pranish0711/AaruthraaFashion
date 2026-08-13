"use server";

import { signIn, signOut } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: (formData.get("callbackUrl") as string) || "/admin",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}
