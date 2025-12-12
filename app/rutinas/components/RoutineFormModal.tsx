"use client";

import { useEffect, useState } from "react";
import type { RoutineI } from "@/app/shared/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type CreateRoutine,
  useCreateRoutine,
} from "../hooks/routines/useCreateRoutine";
import {
  type UpdateRoutine,
  useUpdateRoutine,
} from "../hooks/routines/useUpdateRoutine";

type RoutineFormModalProps = {
  open: boolean;
  onCloseAction: () => void;
  routine?: RoutineI;
};

export default function RoutineFormModal({
  open,
  onCloseAction,
  routine,
}: RoutineFormModalProps) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const createRoutine = useCreateRoutine();
  const updateRoutine = useUpdateRoutine();

  const isEditing = !!routine;
  const title = isEditing ? "Editar rutina" : "Crear nueva rutina";
  const submitText = isSubmitting
    ? "Guardando..."
    : isEditing
      ? "Guardar cambios"
      : "Crear rutina";

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
    onCloseAction();
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? "Modifica los datos de tu rutina"
              : "Completa los datos para crear una nueva rutina"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-50 border-red-200 text-red-700"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nombre de la rutina *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej: Push Pull Legs"
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium"
              >
                Descripción (opcional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Ej: Rutina de 3 días por semana"
                rows={3}
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
              disabled={isSubmitting}
            >
              {submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
