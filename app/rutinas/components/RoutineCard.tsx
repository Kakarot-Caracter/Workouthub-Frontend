"use client";

import Link from "next/link";
import { Edit, Trash, ArrowRight, Dumbbell } from "lucide-react";
import type { RoutineI } from "@/app/shared/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

type RoutineCardProps = {
  routine: RoutineI;
  onEditAction: () => void;
  onDeleteAction: () => void;
};

export default function RoutineCard({
  routine,
  onEditAction,
  onDeleteAction,
}: RoutineCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <TooltipProvider>
      <Card className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Gradient border top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-3xl" />

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">
                  {routine.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mt-1">
                  {routine.description
                    ? truncateText(routine.description, 60)
                    : "Sin descripción"}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-4">
          {/* Routine stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Rutina personalizada</span>
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
              <Link href={`/rutinas/${routine.id}`}>
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
                  <p>Editar rutina</p>
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
                  <p>Eliminar rutina</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
