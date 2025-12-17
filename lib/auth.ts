'use server'

// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export interface UserPayload {
  id: number;
  username: string;
  email: string;
}

export async function getAuthUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as UserPayload;

    return decoded;
  } catch (error) {
    // Token inválido o expirado
    return null;
  }
}

export async function requireAuth(): Promise<UserPayload> {
  const user = await getAuthUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
}