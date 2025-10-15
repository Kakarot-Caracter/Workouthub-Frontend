// components/ConfirmDeleteExerciseModal.tsx
"use client";

import React from "react";
import { X, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { useDeleteExercise } from "../hooks/exercises/useDeleteExercise";

type ConfirmDeleteExerciseModalProps = {
  open: boolean;
  onClose: () => void;
  routineId: number;
  exerciseId: number;
  itemName?: string;
  onDeleted?: () => void;
};

export default function ConfirmDeleteExerciseModal({
  open,
  onClose,
  routineId,
  exerciseId,
  itemName = "",
  onDeleted,
}: ConfirmDeleteExerciseModalProps) {
  const deleteMutation = useDeleteExercise();

  const mutAny = deleteMutation as unknown as {
    isLoading?: boolean;
    isPending?: boolean;
  };
  const isLoading =
    typeof mutAny.isLoading === "boolean"
      ? mutAny.isLoading
      : typeof mutAny.isPending === "boolean"
      ? mutAny.isPending
      : deleteMutation.status === "pending";

  const handleConfirm = async () => {
    if (!exerciseId) return;
    try {
      await deleteMutation.mutateAsync({ routineId, exerciseId });
      onDeleted?.();
      onClose();
    } catch (err) {
      console.error("Error al eliminar ejercicio:", err);
      // error is shown from deleteMutation.error
    }
  };

  const handleClose = () => {
    if (!isLoading) onClose();
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
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Eliminar ejercicio
          </h3>
        </div>

        <div className="mb-4">
          <p className="text-slate-600 mb-2">
            ¿Estás seguro de que quieres eliminar el ejercicio{" "}
            <span className="font-semibold text-slate-900">{itemName}</span>?
          </p>
          <p className="text-sm text-slate-500">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {deleteMutation.error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle size={16} />
              <span className="text-sm font-medium">Error al eliminar</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              {(deleteMutation.error as Error)?.message ||
                "Ocurrió un error inesperado"}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Eliminar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
