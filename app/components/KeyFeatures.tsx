import React from "react";
import { Target, TrendingUp, Users } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      icon: <Target className="w-10 h-10 text-teal-800" />,
      title: "Rutinas Personalizadas",
      description:
        "Crea y personaliza rutinas adaptadas a tus objetivos específicos de fitness.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-teal-800" />,
      title: "Seguimiento de Progreso",
      description:
        "Monitorea tu evolución con estadísticas detalladas y métricas de rendimiento.",
    },
    {
      icon: <Users className="w-10 h-10 text-teal-800" />,
      title: "Comunidad Activa",
      description:
        "Conecta con otros entusiastas del fitness y comparte tu progreso.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br  flex justify-center">
      <div className=" w-full text-center">
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-balance">
          Características Principales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-cyan-50 p-8  rounded-lg shadow-sm text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
