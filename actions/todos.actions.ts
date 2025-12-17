"use server";

import { requireAuth } from "@/lib/auth";
import {
  createTodo,
  deleteTodoService,
  getTodosByU,
} from "@/lib/repositories/todos.repository";
import { revalidatePath } from "next/cache";

export const postTodo = async (formData: FormData) => {
  const user = await requireAuth();

  const task = formData.get("task") as string;

  try {
    await createTodo(user.id, task);
    revalidatePath("/app/todos");
    return { success: true };
  } catch (error) {
    return { error: "Error al crear la tarea" };
  }
};

export const getTodosByUser = async () => {
  const user = await requireAuth();

  try {
    const response = await getTodosByU(user.id);

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todo_id: number) => {
  await requireAuth();

  try {
    await deleteTodoService(todo_id);
    revalidatePath("/app/todos");
    return { success: true };
  } catch (error) {
    throw error;
  }
};
