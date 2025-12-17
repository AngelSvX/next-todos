import { updateTodoTask } from '@/actions/todos.actions'
import { Dispatch, SetStateAction } from 'react'

function TodoUpdate({ setUpdateOpen, todo_task, todo_id }: { setUpdateOpen: Dispatch<SetStateAction<boolean>>, todo_task: string, todo_id: number }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-80 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={() => setUpdateOpen(false)}
        >
          X
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Editar Tarea
        </h2>


        <form action={async (formData) => {
          const result = updateTodoTask(formData, todo_id)

          if ( (await result).success) {
            setUpdateOpen(false)
          }
        }}>
          <input
            type="text"
            name="new_task"
            defaultValue={todo_task}
            placeholder="Nuevo nombre de la tarea"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
          />

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
              onClick={() => setUpdateOpen(false)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoUpdate
