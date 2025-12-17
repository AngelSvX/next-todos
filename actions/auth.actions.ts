"use server";

import { createUser, loginUser } from "@/lib/repositories/user.repository";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await createUser({
    username,
    email,
    password,
  });
}


export async function authUser(formdata: FormData) {

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  const result = await loginUser({
    email,
    password
  })

  const cookieStore = await cookies()

  cookieStore.set({
    name: "auth-token",
    value: result.token as string,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/"
  })

  redirect("/todos")

}

export async function logoutUser(){
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  redirect("/login")
}