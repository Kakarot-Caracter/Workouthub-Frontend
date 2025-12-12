import { Activity, ArrowRight, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="w-full py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-5 md:left-20 opacity-10">
        <Activity className="w-40 h-40 text-blue-500 rotate-12" />
      </div>
      <div className="absolute bottom-20 right-5 md:right-20 opacity-10">
        <Target className="w-40 h-40 text-teal-500 -rotate-12" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Transforma Tu Fitness
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-violet-600 bg-clip-text text-transparent">
              Desata Tu Potencial
            </span>
            <br />
            <span className="text-gray-800 text-4xl md:text-6xl">
              Al Máximo
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Aplicación minimalista de gimnasio diseñada para transformar tu
            rutina de ejercicios en una experiencia{" "}
            <span className="font-semibold text-blue-600">profesional</span> y{" "}
            <span className="font-semibold text-teal-600">motivadora</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              variant="default"
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-7 px-10 rounded-2xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              asChild
            >
              <Link href="/rutinas" className="flex items-center gap-3">
                Comenzar Ahora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 text-gray-800 font-semibold py-7 px-10 rounded-2xl hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/rutinas" className="flex items-center gap-3">
                Ver Rutinas
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
