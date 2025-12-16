'use client'

import { authUser } from "@/actions/auth.actions";
import Link from "next/link";
import { useState } from "react";

function LoginPage() {

  const [viewPass, setViewPass] = useState<boolean>(false)

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md rounded-xl shadow-2xl overflow-hidden md:max-w-lg transition-all duration-300">
        <div className="p-8 md:p-10">

          <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-400">
            Iniciar Sesión
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Accede a tu cuenta para continuar
          </p>

          <form className="space-y-6" action={async (formData) => {
            const result = await authUser(formData)
            console.log(result)
          }}>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ejemplo@dominio.com"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Contraseña
              </label>
              <div className="mt-1">
                {
                  viewPass ?
                    (
                      <input
                        id="password"
                        name="password"
                        type="text"
                        required
                        placeholder="••••••••"
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                      />
                    )
                    :
                    (
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                      />
                    )
                }
                <button type="button" onClick={() => {
                  viewPass === true ? setViewPass(false) : setViewPass(true)
                }}>
                  mostrar
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Acceder
              </button>
            </div>
          </form>
          <Link className="pt-2 text-gray-300" href="/registro">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
