import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";

const TestimonialsCards = () => {
  const testimonials = [
    {
      icon: <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Experiencia Motivadora",
      description:
        "¡Esta aplicación me mantiene motivado y constante con mis objetivos de fitness cada día!",
      author: "Carlos M.",
      role: "Usuario Premium",
      rating: 5,
      gradient: "from-blue-500 to-teal-500",
    },
    {
      icon: <ThumbsUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Fácil de Usar",
      description:
        "Las rutinas son muy fáciles de seguir y puedo adaptarlas a mi horario. ¡Revolucionó mi entrenamiento!",
      author: "Ana L.",
      role: "Atleta Casual",
      rating: 5,
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Comunidad Increíble",
      description:
        "Me encanta conectar con otras personas que comparten el mismo camino fitness. ¡Motivación pura!",
      author: "David R.",
      role: "Entusiasta Fitness",
      rating: 5,
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-4">
      {testimonials.map((testimonial, index) => (
        <div key={index++} className="group">
          <Card className="relative bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden">
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${testimonial.gradient}`}
            />

            <CardHeader className="p-0 mb-6">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <div
                    className={`bg-gradient-to-br ${testimonial.gradient} p-2 rounded-lg`}
                  >
                    {testimonial.icon}
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i++}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 mb-6">
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
                {testimonial.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed italic">
                &quot;{testimonial.description}&quot;
              </CardDescription>
            </CardContent>

            <CardFooter className="p-0 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 w-full">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 font-bold text-gray-700">
                    {testimonial.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    {testimonial.author}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs sm:text-sm bg-transparent text-gray-500 hover:bg-transparent px-0"
                  >
                    {testimonial.role}
                  </Badge>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TestimonialsCards;
