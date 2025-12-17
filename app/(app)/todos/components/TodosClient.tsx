'use client'

import { useState } from "react";
import { logoutUser } from "@/actions/auth.actions";
import TodoCreate from "./TodoCreate";
import { UserPayload } from "@/lib/auth";
import { deleteTodo } from "@/actions/todos.actions";

interface Todo {
  id: number;
  task: string;
  is_completed: number;
}

export default function TodosClient({ initialTodos, user }: {
  initialTodos: Todo[],
  user: UserPayload
}) {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Mis Tareas
        </h1>
        <button
          onClick={() => logoutUser()}
          className="px-4 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Cerrar Sesión
        </button>
      </header>

      <div className="w-full max-w-2xl bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 border border-gray-700">
        <form className="flex mb-8 gap-2">
          <button
            type="button"
            className="p-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-full"
            onClick={() => { setOpen(true) }}
          >
            Añadir
          </button>
        </form>

        <div className="space-y-3">
          {initialTodos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center p-4 border rounded-lg transition duration-150 ease-in-out ${todo.is_completed === 1
                ? 'bg-green-900 border-green-800 opacity-80'
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                }`}
            >
              <input
                type="checkbox"
                checked={todo.is_completed === 1}
                onChange={async () => {
                  // Aquí llamarías a una Server Action para actualizar
                  // await toggleTodo(todo.id)
                }}
                className="form-checkbox h-5 w-5 text-indigo-500 bg-gray-800 rounded border-gray-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span
                className={`ml-4 text-lg flex-grow ${todo.is_completed === 1 ? 'line-through text-gray-400' : 'text-gray-100'
                  }`}
              >
                {todo.task}
              </span>
              <button
                className="text-gray-500 hover:text-red-500 transition duration-150 ease-in-out p-1"
                aria-label="Eliminar tarea"
                onClick={() => deleteTodo(todo.id)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {initialTodos.length === 0 && (
          <p className="text-center text-gray-500 italic mt-6">
            ¡Todo completado! Agrega una nueva tarea.
          </p>
        )}
      </div>

      {
        open &&
        (
          <TodoCreate setOpen={setOpen} user={user} />
        )
      }

    </div>
  );
}