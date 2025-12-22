"use client";

import Link from "next/link";
import { Edit, Trash, ArrowRight, Dumbbell } from "lucide-react";
import type { DietI } from "@/app/shared/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DietCardProps = {
  diet: DietI;
  onEditAction: () => void;
  onDeleteAction: () => void;
};

export default function DietCard({
  diet,
  onEditAction,
  onDeleteAction,
}: DietCardProps) {
  return (
    <TooltipProvider>
      <Card className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-3xl" />

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">
                  {diet.name}
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Dieta personalizada</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span>Progreso activo</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between w-full">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="group/btn gap-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl"
            >
              <Link href={`/dietas/${diet.id}`}>
                Ver detalles
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEditAction();
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar dieta</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteAction();
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar dieta</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
