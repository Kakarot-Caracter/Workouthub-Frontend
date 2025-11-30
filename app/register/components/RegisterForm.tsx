"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, XCircle } from "lucide-react";
import { useAuthStore } from "@/app/stores/auth.store";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    try {
      const success = await registerUser(
        data.username,
        data.email,
        data.password,
      );

      if (!success) {
        const msg = "Credenciales inválidas o el usuario ya existe.";

        setServerError(msg);
        return;
      }

      router.push("/");
    } catch (err: unknown) {
      const msg =
        (err instanceof Error && err.message) ||
        (typeof err === "string" && err) ||
        "Error del servidor. Intenta más tarde.";

      setServerError(msg);
    }
  };

  const getAggregateError = () => {
    if (serverError) return serverError;
    // Mostrar el primer error de validación (si el usuario intentó enviar el formulario)
    if (isSubmitted) {
      return (
        errors.username?.message ??
        errors.email?.message ??
        errors.password?.message ??
        null
      );
    }
    return null;
  };

  const aggregateMessage = getAggregateError();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Nombre */}
      <div>
        <input
          type="text"
          placeholder="Nombre"
          {...register("username", { required: "El nombre es obligatorio" })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

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
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
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
        {isSubmitting ? "Registrando..." : "Registrarse"}
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

export default RegisterForm;
