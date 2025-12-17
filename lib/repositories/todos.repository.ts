import { ResultSetHeader, RowDataPacket } from "mysql2";
import { todoDB } from "../db";

export interface TodoDTO {
  user_id: number;
  task: string;
  is_completed: number;
}

export interface TodoPayload {
  id: number;
  user_id: number;
  task: string;
  is_completed: number;
  created_at: Date;
}

export interface TodoRow extends RowDataPacket, TodoPayload {}

export const createTodo = async (user_id: number, task: string) => {
  const query = `
    INSERT INTO todos(user_id, task, is_completed)
    VALUES(?, ?, 0);
  `;

  const result = await todoDB.execute<ResultSetHeader>(query, [user_id, task]);

  return result;
};

export const getTodosByU = async (user_id: number) => {
  try {
    const query = `
    SELECT * FROM todos t WHERE t.user_id = ?
  `;
    const [result] = await todoDB.execute<TodoRow[]>(query, [user_id]);

    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoService = async (todo_id: number) => {
  try {
    const deleteQuery = `
    DELETE FROM todos WHERE todos.id = ?
    `;

    const result = await todoDB.execute(deleteQuery, [todo_id]);

    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTodoStatusService = async (is_completed: number, user_id: number, todo_id: number) => {
  try {
    const query = `
      UPDATE todos SET todos.is_completed = ?
      WHERE user_id = ? AND todos.id = ?
    `;

    const result = await todoDB.execute(query, [is_completed, user_id, todo_id])

    return result

  } catch (error) {
    throw error
  }
};

export const updateTodoTaskService = async (new_task: string, todo_id: number) => {
  try {
    const query = `
      UPDATE todos SET todos.task = ?
      WHERE todos.id = ?
    `

    const result = await todoDB.execute(query, [
      new_task, todo_id
    ])

    return result

  } catch (error) {
    throw error
  }
}