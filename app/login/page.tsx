import React from "react";

import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-100 to-gray-100 flex justify-center">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-950 mb-6">
          Iniciar Sesión
        </h2>

        <p className="text-gray-700 mb-8">
          Accede a tu cuenta para continuar con tus rutinas y progreso.
        </p>

        <LoginForm />

        <p className="text-gray-500 mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-blue-950 font-medium hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
