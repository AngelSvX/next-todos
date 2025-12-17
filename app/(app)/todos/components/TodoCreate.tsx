import { postTodo } from "@/actions/todos.actions"
import { UserPayload } from "@/lib/auth"
import { Dispatch, SetStateAction } from "react"

function TodoCreate({setOpen, user}: {setOpen: Dispatch<SetStateAction<boolean>>, user: UserPayload}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          X
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Nueva Tarea
        </h2>


        <form action={async (formData) => {
          const result = await postTodo(formData)
          if(result.success){
            setOpen(false)
          }
        }}>
          <input
            type="text"
            name="task"
            placeholder="Nombre de la Tarea"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black" 
          />

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoCreate
