'use client'

import { registerUser } from "@/actions/auth.actions";
import Link from "next/link";
import { useState } from "react";

function RegisterPage() {

  const [viewPass, setViewPass] = useState<boolean>(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">

      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl shadow-indigo-900/40 overflow-hidden transition-all duration-300 border border-gray-700">
        <div className="p-8 md:p-10">

          <h2 className="text-4xl font-extrabold text-white text-center mb-2">
            Crear Cuenta
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Únete a nuestra plataforma hoy
          </p>

          <form className="space-y-6" action={registerUser}>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Nombre de Usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Elige un nombre de usuario"
                  className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
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
                  className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Contraseña
              </label>
              {
                viewPass === true ?
                  (
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="text"
                        required
                        placeholder="Mínimo 8 caracteres"
                        className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                      />
                    </div>
                  )
                  :
                  (
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Mínimo 8 caracteres"
                        className="appearance-none block w-full px-4 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                      />
                    </div>
                  )
              }
              <button type="button" className="block text-sm font-medium text-gray-300"
                onClick={() => { viewPass ? setViewPass(false) : setViewPass(true) }}
              >
                Mostrar
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
              >
                Registrarse
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-150">
                Inicia Sesión
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage
