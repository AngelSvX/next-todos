import { requireAuth } from "@/lib/auth";

async function TodoLayout({children} : {children: React.ReactNode}) {

  // Verifica JWT completo (firma y expiración)
  const user = await requireAuth();

  return (
    <div>
      My Todo Layout - Bienvenido {user.username} con email {user.email}
      <div>
        {
          children
        }
      </div>
    </div>
  )
}

export default TodoLayout
