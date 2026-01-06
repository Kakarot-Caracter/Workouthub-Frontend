"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
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
import { API_URL } from "../shared/constants/url-api";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const router = useRouter();

  React.useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const [success, setSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return; // seguridad extra
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.password }),
      });

      if (!res.ok) {
        setServerError("Error al cambiar la contraseña. Intenta de nuevo.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Error del servidor.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <section className="w-full py-12 flex justify-center">
        <p className="text-red-600 text-center">
          Token inválido o expirado. Redirigiendo a login…
        </p>
      </section>
    );
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex justify-center">
      <Card className="max-w-md w-full border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl">
              <Key className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Restablecer Contraseña
          </CardTitle>
          <CardDescription className="text-gray-600">
            Ingresa tu nueva contraseña para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-green-600 text-center">
              Contraseña cambiada. Redirigiendo…
            </p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Nueva contraseña
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
                  <div className="p-3 rounded-lg text-red-700 text-sm">
                    {serverError}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  {isSubmitting ? "Cambiando..." : "Cambiar contraseña"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ResetPasswordForm;
