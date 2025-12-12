import { ChevronRight, Target, TrendingUp, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeaturesCards = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Rutinas Personalizadas",
      description:
        "Crea y personaliza rutinas adaptadas a tus objetivos específicos de fitness.",
      gradient: "bg-gradient-to-br from-teal-500 to-emerald-500",
      bgColor: "bg-teal-50",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Seguimiento de Progreso",
      description:
        "Monitorea tu evolución con estadísticas detalladas y métricas de rendimiento.",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Comunidad Activa",
      description:
        "Conecta con otros entusiastas del fitness y comparte tu progreso.",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
      {features.map((feature, index) => (
        <div key={index++} className="group">
          <Card className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden group-hover:-translate-y-2 h-full">
            <div className={`h-1.5 w-full ${feature.gradient}`} />

            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`p-3 rounded-2xl ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`${feature.gradient.replace(
                      "bg-gradient-to-br",
                      "bg-gradient-to-br",
                    )} p-2 rounded-xl`}
                  >
                    {feature.icon}
                  </div>
                </div>

                <div className="text-5xl font-bold text-gray-100 group-hover:text-gray-200 transition-colors">
                  {index + 1}
                </div>
              </div>

              <CardTitle className="text-xl font-bold text-gray-800 mb-3 text-left">
                {feature.title}
              </CardTitle>

              <CardDescription className="text-gray-600 text-left text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                <span>Explorar más</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FeaturesCards;
