"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, XCircle } from "lucide-react";
import { useAuthStore } from "@/app/stores/auth.store";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const loginUser = useAuthStore((s) => s.login);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      email: "itachimartinez0@gmail.com",
      password: "MADARA12345",
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    try {
      const success = await loginUser(data.email, data.password);

      if (!success) {
        const msg = "Credenciales inválidas. Verifica email y contraseña.";
        setError("password", { type: "server", message: msg });
        setServerError(msg);
        return;
      }

      router.push("/");
    } catch (err: unknown) {
      // obtenemos un mensaje seguro
      let msg: string = "Error del servidor. Intenta más tarde.";

      if (typeof err === "string") {
        msg = err;
      } else if (err instanceof Error) {
        msg = err.message;
      }

      // chequeo de errores de autenticación
      if (
        msg.toLowerCase().includes("401") ||
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("credencial")
      ) {
        setError("password", {
          type: "server",
          message: "Credenciales inválidas.",
        });
      }

      setServerError(msg);
    }
  };

  const getAggregateError = () => {
    if (serverError) return serverError;
    if (isSubmitted) {
      return errors.email?.message ?? errors.password?.message ?? null;
    }
    return null;
  };

  const aggregateMessage = getAggregateError();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Email */}
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Correo inválido",
            },
          })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Contraseña */}
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-blue-950 text-white font-medium py-3 px-6 rounded-lg transition-colors hover:bg-blue-800 disabled:opacity-50"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
        <ArrowRight size={20} />
      </button>

      {/* Mensaje global al final del formulario */}
      {aggregateMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-4 flex items-start gap-3 p-3 rounded border border-red-200 bg-red-50 text-red-700"
        >
          <XCircle size={20} />
          <div className="text-sm leading-tight">{aggregateMessage}</div>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
