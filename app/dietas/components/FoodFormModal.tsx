"use client";

import React, { useState, useEffect } from "react";
import { FoodI } from "@/app/shared/types";

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
import { useCreateFood } from "@/app/dietas/hooks/foods/useCreateFood";
import { useUpdateFood } from "@/app/dietas/hooks/foods/useUpdateFood";

interface FoodFormModalProps {
  open: boolean;
  onClose: () => void;
  food?: FoodI;
  dietId: number;
}

interface FormData {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface FoodData {
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

const safeParseFloat = (value: string): number | undefined => {
  if (!value || value.trim() === "") return undefined;
  const parsed = parseFloat(value.trim());
  return isNaN(parsed) ? undefined : parsed;
};

export const FoodFormModal: React.FC<FoodFormModalProps> = ({
  open,
  onClose,
  food,
  dietId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const createMutation = useCreateFood();
  const updateMutation = useUpdateFood();

  const isEditing = !!food;
  const isLoading = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  useEffect(() => {
    if (open) {
      if (food) {
        setFormData({
          name: food.name || "",
          calories: food.calories?.toString() || "",
          protein: food.protein?.toString() || "",
          carbs: food.carbs?.toString() || "",
          fat: food.fat?.toString() || "",
        });
      } else {
        setFormData({
          name: "",
          calories: "",
          protein: "",
          carbs: "",
          fat: "",
        });
      }
    }
  }, [open, food]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Safely parse numeric fields and remove undefined values
    const foodData: FoodData = {
      name: formData.name.trim(),
    };

    const calories = safeParseFloat(formData.calories);
    if (calories !== undefined) {
      foodData.calories = calories;
    }

    const protein = safeParseFloat(formData.protein);
    if (protein !== undefined) {
      foodData.protein = protein;
    }

    const carbs = safeParseFloat(formData.carbs);
    if (carbs !== undefined) {
      foodData.carbs = carbs;
    }

    const fat = safeParseFloat(formData.fat);
    if (fat !== undefined) {
      foodData.fat = fat;
    }

    try {
      if (isEditing && food) {
        await updateMutation.mutateAsync({
          dietId,
          foodId: food.id,
          foodData,
        });
      } else {
        await createMutation.mutateAsync({
          dietId,
          foodData,
        });
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar alimento:", error);
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
            {isEditing ? "Editar alimento" : "Nuevo alimento"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? "Modifica los datos del alimento"
              : "Completa los datos para agregar un nuevo alimento"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-50 border-red-200 text-red-700"
            >
              <AlertDescription>
                {(error as Error)?.message || "Error al guardar el alimento"}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nombre del alimento *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Pollo a la plancha"
                className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                disabled={isLoading}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories" className="text-gray-700 font-medium">
                  Calorías
                </Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.calories}
                  onChange={handleInputChange}
                  placeholder="250"
                  className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">kcal</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="protein" className="text-gray-700 font-medium">
                  Proteínas
                </Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.protein}
                  onChange={handleInputChange}
                  placeholder="30"
                  className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">gramos</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carbs" className="text-gray-700 font-medium">
                  Carbohidratos
                </Label>
                <Input
                  id="carbs"
                  name="carbs"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.carbs}
                  onChange={handleInputChange}
                  placeholder="10"
                  className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">gramos</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fat" className="text-gray-700 font-medium">
                  Grasas
                </Label>
                <Input
                  id="fat"
                  name="fat"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.fat}
                  onChange={handleInputChange}
                  placeholder="5"
                  className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">gramos</p>
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
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading
                ? "Guardando..."
                : isEditing
                  ? "Guardar cambios"
                  : "Crear alimento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
