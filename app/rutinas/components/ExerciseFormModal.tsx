"use client";

import React, { useState, useEffect } from "react";
import { X, Save, AlertTriangle, Loader2 } from "lucide-react";
import { ExerciseI } from "@/app/shared/types";
import { useCreateExercise } from "../hooks/exercises/useCreateExercises";
import { useUpdateExercise } from "../hooks/exercises/useUpdateExercise";

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

// Helper function to safely parse integers
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    console.log("Sending exercise data:", exerciseData); // Debug log

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-sky-900">
            {isEditing ? "Editar ejercicio" : "Nuevo ejercicio"}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre del ejercicio *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:bg-slate-100"
              placeholder="Ej: Flexiones"
            />
          </div>

          {/* Series, Reps, Peso */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "sets", label: "Series", placeholder: "3" },
              { id: "reps", label: "Repeticiones", placeholder: "10" },
              {
                id: "weight",
                label: "Peso (kg)",
                placeholder: "20",
              },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof FormData]}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:bg-slate-100"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          {/* Error */}
          {(createMutation.error || updateMutation.error) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle size={16} />
                <span className="text-sm font-medium">Error al guardar</span>
              </div>
              <p className="text-sm text-red-600 mt-1">
                {(createMutation.error || updateMutation.error)?.message ||
                  "Ocurrió un error inesperado"}
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.name.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-sky-900 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
