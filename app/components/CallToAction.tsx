import React from "react";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 px-4  bg-cyan-900 text-primary-foreground">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-4">
          ¿Listo para Comenzar tu Transformación?
        </h3>
        <p className="text-xl mb-8 opacity-90">
          Únete a miles de usuarios que ya están alcanzando sus objetivos de
          fitness.
        </p>
        <a href="/register">
          <button className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition">
            Crear Cuenta Gratis
            <ArrowRight className="w-5 h-5" />
          </button>
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
