"use client";

import React, { useState, useEffect } from "react";
import { ExerciseI } from "@/app/shared/types";
import { useCreateExercise } from "../hooks/exercises/useCreateExercises";
import { useUpdateExercise } from "../hooks/exercises/useUpdateExercise";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExerciseFormModalProps {
  open: boolean;
  onClose: () => void;
  exercise?: ExerciseI;
  routineId: number;
}

interface FormData {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface ExerciseData {
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

const safeParseInt = (value: string): number | undefined => {
  if (!value || value.trim() === "") return undefined;
  const parsed = parseInt(value.trim(), 10);
  return isNaN(parsed) ? undefined : parsed;
};

export const ExerciseFormModal: React.FC<ExerciseFormModalProps> = ({
  open,
  onClose,
  exercise,
  routineId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    sets: "",
    reps: "",
    weight: "",
  });

  const createMutation = useCreateExercise();
  const updateMutation = useUpdateExercise();

  const isEditing = !!exercise;
  const isLoading = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  useEffect(() => {
    if (open) {
      if (exercise) {
        setFormData({
          name: exercise.name || "",
          sets: exercise.sets?.toString() || "",
          reps: exercise.reps?.toString() || "",
          weight: exercise.weight?.toString() || "",
        });
      } else {
        setFormData({
          name: "",
          sets: "",
          reps: "",
          weight: "",
        });
      }
    }
  }, [open, exercise]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Safely parse numeric fields and remove undefined values
    const exerciseData: ExerciseData = {
      name: formData.name.trim(),
    };

    const sets = safeParseInt(formData.sets);
    if (sets !== undefined) {
      exerciseData.sets = sets;
    }

    const reps = safeParseInt(formData.reps);
    if (reps !== undefined) {
      exerciseData.reps = reps;
    }

    const weight = safeParseInt(formData.weight);
    if (weight !== undefined) {
      exerciseData.weight = weight;
    }

    try {
      if (isEditing && exercise) {
        await updateMutation.mutateAsync({
          routineId,
          exerciseId: exercise.id,
          exerciseData,
        });
      } else {
        await createMutation.mutateAsync({
          routineId,
          exerciseData,
        });
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar ejercicio:", error);
    }
  };

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {isEditing ? "Editar ejercicio" : "Nuevo ejercicio"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? "Modifica los datos del ejercicio"
              : "Completa los datos para agregar un nuevo ejercicio"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-50 border-red-200 text-red-700"
            >
              <AlertDescription>
                {(error as Error)?.message || "Error al guardar el ejercicio"}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nombre del ejercicio *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Flexiones"
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sets" className="text-gray-700 font-medium">
                  Series
                </Label>
                <Input
                  id="sets"
                  name="sets"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.sets}
                  onChange={handleInputChange}
                  placeholder="3"
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reps" className="text-gray-700 font-medium">
                  Repeticiones
                </Label>
                <Input
                  id="reps"
                  name="reps"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.reps}
                  onChange={handleInputChange}
                  placeholder="10"
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="weight" className="text-gray-700 font-medium">
                  Peso (kg)
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="20"
                  className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear ejercicio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
