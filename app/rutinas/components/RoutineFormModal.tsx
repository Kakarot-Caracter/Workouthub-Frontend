"use client";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import type { RoutineI } from "@/app/shared/types";

import {
  CreateRoutine,
  useCreateRoutine,
} from "../hooks/routines/useCreateRoutine";

import {
  useUpdateRoutine,
  UpdateRoutine,
} from "../hooks/routines/useUpdateRoutine";

type RoutineFormModalProps = {
  open: boolean;
  onClose: () => void;
  routine?: RoutineI;
};

export default function RoutineFormModal({
  open,
  onClose,
  routine,
}: RoutineFormModalProps) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const createRoutine = useCreateRoutine();
  const updateRoutine = useUpdateRoutine();

  const isEditing = !!routine;
  const title = isEditing ? "Editar rutina" : "Crear nueva rutina";
  const submitText = isEditing ? "Guardar cambios" : "Crear rutina";

  useEffect(() => {
    if (open && routine) {
      setFormData({
        name: routine.name || "",
        description: routine.description || "",
      });
    } else if (open) {
      setFormData({ name: "", description: "" });
    }
    setError("");
  }, [open, routine]);

  const handleClose = () => {
    setFormData({ name: "", description: "" });
    setIsSubmitting(false);
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("El nombre de la rutina es obligatorio");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && routine) {
        const payload: UpdateRoutine = {
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
        };
        await updateRoutine.mutateAsync({ id: routine.id, payload });
      } else {
        const payload: CreateRoutine = {
          name: formData.name.trim(),
          description: formData.description.trim(),
        };
        await createRoutine.mutateAsync(payload);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar rutina:", error);
      setError(`Error al ${isEditing ? "actualizar" : "crear"} la rutina`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6 mx-4">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-gray-100 transition-colors"
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-6 pr-8">{title}</h3>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre de la rutina *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ej: Push Pull Legs"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Ej: Rutina de 3 días por semana"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-sky-800 text-white rounded-lg hover:bg-sky-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
