"use client";

import { useEffect, useState } from "react";
import type { DietI } from "@/app/shared/types";
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

import { CreateDiet, useCreateDiet } from "../hooks/diets/useCreateDiet";
import { UpdateDiet, useUpdateDiet } from "../hooks/diets/useUpdateDiet";

type DietFormModalProps = {
  open: boolean;
  onCloseAction: () => void;
  diet?: DietI;
};

export default function DietFormModal({
  open,
  onCloseAction,
  diet,
}: DietFormModalProps) {
  const [formData, setFormData] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const createDiet = useCreateDiet();
  const updateDiet = useUpdateDiet();

  const isEditing = !!diet;
  const title = isEditing ? "Editar dieta " : "Crear nueva dieta";
  const submitText = isSubmitting
    ? "Guardando..."
    : isEditing
      ? "Guardar cambios"
      : "Crear dieta";

  useEffect(() => {
    if (open && diet) {
      setFormData({
        name: diet.name || "",
      });
    } else if (open) {
      setFormData({ name: "" });
    }
    setError("");
  }, [open, diet]);

  const handleClose = () => {
    setFormData({ name: "" });
    setIsSubmitting(false);
    setError("");
    onCloseAction();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("El nombre de la dieta es obligatorio");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && diet) {
        const payload: UpdateDiet = {
          name: formData.name.trim(),
        };
        await updateDiet.mutateAsync({ id: diet.id, payload });
      } else {
        const payload: CreateDiet = {
          name: formData.name.trim(),
        };
        await createDiet.mutateAsync(payload);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar dieta:", error);
      setError(`Error al ${isEditing ? "actualizar" : "crear"} la dieta`);
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
              ? "Modifica los datos de tu dieta"
              : "Completa los datos para crear una nueva dieta"}
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
                Nombre de la dieta *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej: Dieta A, Dieta B, etc."
                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isSubmitting}
                required
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
