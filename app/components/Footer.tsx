"use client";

import { Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50/10" />

      <div className="max-w-4xl mx-auto relative">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-center">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                WorkoutHub
              </span>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Tu fitness, simplificado
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-600 text-center max-w-md mx-auto px-4">
            Transformamos tu rutina de ejercicios en una experiencia profesional
            y motivadora.
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

        <div className="hidden sm:flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>© 2025 WorkoutHub</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Hecho con{" "}
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />{" "}
              para ti
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            onClick={scrollToTop}
          >
            <span className="text-xs sm:text-sm">Volver arriba</span>
          </Button>
        </div>

        <div className="mt-6 sm:hidden text-center">
          <div className="text-xs text-gray-500 space-y-1">
            <div>© 2025 WorkoutHub. Todos los derechos reservados.</div>
            <div className="flex items-center justify-center gap-1">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>para la comunidad fitness</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
