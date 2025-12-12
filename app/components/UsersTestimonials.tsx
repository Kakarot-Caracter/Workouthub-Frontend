import { Sparkles } from "lucide-react";
import TestimonialsCards from "./TestimonialsCards";

const UserTestimonials = () => {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 border border-blue-100 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-blue-700">
              Testimonios Reales
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-violet-600 bg-clip-text text-transparent block">
              Lo Que Dicen
            </span>
            <span className="text-gray-800 block mt-1 sm:mt-2">
              Nuestros Usuarios
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Descubre cómo nuestra comunidad está transformando su fitness día a
            día.
          </p>
        </div>

        <TestimonialsCards />
      </div>
    </section>
  );
};

export default UserTestimonials;
