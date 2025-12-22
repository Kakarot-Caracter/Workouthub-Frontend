"use client";

import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteFood } from "../hooks/foods/useDeleteFood";

type ConfirmDeleteExerciseModalProps = {
  open: boolean;
  onCloseAction: () => void;
  dietId: number;
  foodId: number;
  itemName?: string;
  onDeletedAction?: () => void;
};

export default function ConfirmDeleteExerciseModal({
  open,
  onCloseAction,
  dietId,
  foodId,
  itemName = "",
  onDeletedAction,
}: ConfirmDeleteExerciseModalProps) {
  const deleteMutation = useDeleteFood();

  const isLoading = deleteMutation.isPending;

  const handleConfirm = async () => {
    if (!foodId) return;
    try {
      await deleteMutation.mutateAsync({ dietId, foodId });
      onDeletedAction?.();
      onCloseAction();
    } catch (err) {
      console.error("Error al eliminar ejercicio:", err);
    }
  };

  const handleClose = () => {
    if (!isLoading) onCloseAction();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">
              Eliminar ejercicio
            </AlertDialogTitle>
          </div>

          {deleteMutation.error && (
            <Alert
              variant="destructive"
              className="mb-4 bg-red-50 border-red-200 text-red-700"
            >
              <AlertDescription>
                {(deleteMutation.error as Error)?.message ||
                  "Error al eliminar el ejercicio"}
              </AlertDescription>
            </Alert>
          )}

          <AlertDialogDescription className="text-gray-600 text-base">
            ¿Estás seguro de que quieres eliminar el ejercicio{" "}
            <span className="font-semibold text-gray-800">
              &quot;{itemName}&quot;
            </span>
            ? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <AlertDialogCancel
            onClick={handleClose}
            disabled={isLoading}
            className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          >
            {isLoading ? "Eliminando..." : "Eliminar ejercicio"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
