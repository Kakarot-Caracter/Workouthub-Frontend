"use client";

import { X, Trash2, AlertTriangle } from "lucide-react";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  routineName: string;
  isDeleting?: boolean;
};

export default function ConfirmDeleteModalRoutine({
  open,
  onClose,
  onConfirm,

  isDeleting = false,
}: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6 mx-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-gray-100 transition-colors"
          disabled={isDeleting}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle size={20} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Eliminar rutina
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-slate-600 mb-2">
            ¿Estás seguro de que quieres eliminar la rutina?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={isDeleting}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              "Eliminando..."
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
