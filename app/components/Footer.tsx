import React from "react";
import { Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border bg-muted">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-foreground">
            WorkoutHub
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          © 2025 WorkoutHub. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
