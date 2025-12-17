import { getTodosByUser } from "@/actions/todos.actions";
import { requireAuth } from "@/lib/auth";
import TodosClient from "./components/TodosClient"; 

async function TodoPage() {
  const user = await requireAuth(); // Esto redirige automáticamente si no hay usuario
  const todoss = await getTodosByUser();
  
  return <TodosClient initialTodos={todoss} user={user} />;
}

export default TodoPage;