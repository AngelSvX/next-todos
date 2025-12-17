import bcrypt from "bcrypt";
import { todoDB } from "../db";
import { RowDataPacket } from "mysql2";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export async function createUser({ username, email, password }: CreateUserDTO) {
  const insertUserQuery = `
    INSERT INTO users
    (username, email, password_hash)
    VALUES (?, ?, ?)
  `;

  const passwordHashed = await bcrypt.hash(password, 10);

  const [result] = await todoDB.execute(insertUserQuery, [
    username,
    email,
    passwordHashed,
  ]);

  return result;
}

interface UserRow extends RowDataPacket{
  id: number;
  username: string;
  email: string;
  password_hash: string;
}

export interface LoginUserPayload{
  email: string,
  password: string
}

export async function loginUser({email, password} : LoginUserPayload) {
  try {
    const myQuery = `
      SELECT u.id, u.username, u.email, u.password_hash FROM users u
      WHERE u.email = ?;
    `;

    const [response] = await todoDB.execute<UserRow[]>(myQuery, [email]);

    // ¿Existe?
    const user = response[0];

    if (!user) {
      return {
        found: false,
      };
    }

    // ¿La contraseña es la correcta?
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return {
        found: true,
        isMatch: false,
      };
    }

    const token =
      // Todo correcto, se envía la respuesta del usuario al front
      jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );

    return {
      found: true,
      isMatch: true,
      token,
    };
  } catch (error) {
    throw error;
  }
}
