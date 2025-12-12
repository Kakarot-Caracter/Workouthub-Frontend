import { Sparkles } from "lucide-react";

import FeaturesCards from "./FeaturesCards";

const KeyFeatures = () => {
  return (
    <section className="w-full py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 mb-6">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">
              Características Exclusivas
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Todo lo que necesitas
            </span>
            <br />
            <span className="text-gray-800">
              para tu transformación fitness
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Herramientas diseñadas para potenciar tu rendimiento y mantenerte
            motivado en cada paso del camino.
          </p>
        </div>

        <FeaturesCards />
      </div>
    </section>
  );
};

export default KeyFeatures;
