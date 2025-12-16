"use server";

import { createUser, loginUser } from "@/lib/repositories/user.repository";

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

  return result

}
