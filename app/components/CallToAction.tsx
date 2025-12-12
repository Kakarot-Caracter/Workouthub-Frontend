import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="w-full py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

      <div className="absolute top-20 left-5 md:left-20 opacity-10">
        <Target className="w-40 h-40 text-blue-500 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-5 md:right-20 opacity-10">
        <TrendingUp className="w-40 h-40 text-teal-500 -rotate-12" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Último Paso
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-violet-600 bg-clip-text text-transparent">
              ¿Listo para Comenzar
            </span>
            <br />
            <span className="text-gray-800">Tu Transformación?</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a miles de usuarios que ya están alcanzando sus objetivos de
            fitness con nuestra{" "}
            <span className="font-semibold text-blue-600">
              plataforma profesional{" "}
            </span>
            y{" "}
            <span className="font-semibold text-teal-600">
              comunidad activa
            </span>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-7 px-10 rounded-2xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              asChild
            >
              <Link href="/register" className="flex items-center gap-3">
                Crear Cuenta Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-gray-600">
                Sin tarjeta requerida
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-gray-600">Cancelación fácil</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50">
              <span className="text-green-600">✓</span>
              <span className="text-sm text-gray-600">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
