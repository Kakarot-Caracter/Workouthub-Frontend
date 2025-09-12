import React from "react";
import {
  ArrowBigRight,
  ArrowRight,
  Download,
  MessageCircle,
  User,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-100 to-gray-100 flex justify-center">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-5xl font-bold text-blue-950 mb-6 text-balance">
          Desata Tu Potencial
        </h2>

        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Aplicación minimalista de gimnasio diseñada para transformar tu rutina
          de ejercicios en una experiencia profesional y motivadora.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/rutinas"
            className="inline-flex items-center justify-center gap-2 bg-blue-950  text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Comenzar Ahora
            <ArrowRight size={20} />
          </a>

          <a
            href="/rutinas"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            Ver Rutinas
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
