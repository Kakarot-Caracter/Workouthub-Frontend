import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-extrabold text-gray-800 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mb-6">
        Página no encontrada
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8 leading-relaxed">
        Estás viendo la página 404 de nuestra{" "}
        <span className="font-semibold text-blue-600">demo</span>. Muchas
        funcionalidades aún{" "}
        <span className="font-semibold text-red-600">
          no están implementadas
        </span>{" "}
        y podrían no estar disponibles. ¡Gracias por probar la aplicación!
      </p>

      <Button
        variant="default"
        size="lg"
        className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-5 px-8 rounded-2xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 hover:shadow-xl flex items-center gap-2"
        asChild
      >
        <Link href="/">
          Volver al Inicio
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </Button>

      <div className="mt-16 text-gray-400 text-sm">
        © 2026 Demo Fitness App. Esta aplicación es solo una demostración.
      </div>
    </div>
  );
}
