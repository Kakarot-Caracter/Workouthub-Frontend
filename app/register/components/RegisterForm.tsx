"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Dumbbell, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/app/stores/auth.store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  username: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" }),
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100, { message: "La contraseña no puede exceder los 100 caracteres" }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.register);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const success = await registerUser(
        data.username,
        data.email,
        data.password,
      );

      if (!success) {
        setServerError("Credenciales inválidas o el usuario ya existe.");
        return;
      }

      router.push("/");
    } catch (err: unknown) {
      const msg =
        (err instanceof Error && err.message) ||
        (typeof err === "string" && err) ||
        "Error del servidor. Intenta más tarde.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Comienza Tu Viaje
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-violet-600 bg-clip-text text-transparent">
                Únete a la
              </span>
              <br />
              <span className="text-gray-800">Comunidad Fitness</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Regístrate y comienza tu camino hacia una rutina más profesional y
              motivadora con herramientas diseñadas para tu éxito.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Rutinas personalizadas",
                "Comunidad activa",
                "Soporte 24/7",
              ].map((feature, index) => (
                <div key={index++} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 max-w-md w-full">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-1">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Crear Cuenta
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Comienza tu transformación en menos de 2 minutos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Nombre
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu nombre completo"
                              className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Correo electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Contraseña
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {serverError && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {serverError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        "Creando cuenta..."
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Crear Cuenta
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                      ¿Ya tienes una cuenta?{" "}
                      <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Inicia sesión
                      </Link>
                    </p>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        Al registrarte, aceptas nuestros{" "}
                        <Link
                          href="/terminos"
                          className="text-blue-600 hover:underline"
                        >
                          Términos
                        </Link>{" "}
                        y{" "}
                        <Link
                          href="/privacidad"
                          className="text-blue-600 hover:underline"
                        >
                          Privacidad
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
