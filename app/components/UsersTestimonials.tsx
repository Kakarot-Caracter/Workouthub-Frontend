import React from "react";
import { MessageSquare, ThumbsUp, Star } from "lucide-react";

const UserTestimonials = () => {
  const testimonials = [
    {
      icon: <MessageSquare className="w-10 h-10 text-teal-800" />,
      title: "Experiencia Motivadora",
      description:
        "¡Esta aplicación me mantiene motivado y constante con mis objetivos de fitness cada día!",
    },
    {
      icon: <ThumbsUp className="w-10 h-10 text-teal-800" />,
      title: "Fácil de Usar",
      description:
        "Las rutinas son muy fáciles de seguir y puedo adaptarlas a mi horario.",
    },
    {
      icon: <Star className="w-10 h-10 text-teal-800" />,
      title: "Comunidad Increíble",
      description:
        "Me encanta conectar con otras personas que comparten el mismo camino fitness.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-100 to-gray-100 flex justify-center">
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold text-gray-600 mb-6 text-balance">
          Lo Que Dicen Nuestros Usuarios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto px-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="flex justify-center mb-4">{testimonial.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {testimonial.title}
              </h3>
              <p className="text-gray-600">{testimonial.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
