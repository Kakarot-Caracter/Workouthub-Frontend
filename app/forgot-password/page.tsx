"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Key } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo electrónico válido" }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const [sent, setSent] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) {
        setServerError("Usuario no registrado o error del servidor.");
        return;
      }

      setSent(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Error del servidor.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Olvidé mi contraseña
          </CardTitle>
          <CardDescription className="text-gray-600">
            Ingresa tu correo para recibir el enlace de recuperación
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <p className="text-green-600 text-center">
              Revisa tu correo para continuar.
            </p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
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
                  {isSubmitting ? "Enviando..." : "Enviar enlace"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPasswordForm;
