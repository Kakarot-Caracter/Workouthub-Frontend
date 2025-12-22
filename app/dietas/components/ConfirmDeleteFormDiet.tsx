"use client";

import { AlertTriangle } from "lucide-react";
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

type ConfirmDeleteModalProps = {
  open: boolean;
  onCloseAction: () => void;
  onConfirmAction: () => void;
  dietName: string;
  isDeleting?: boolean;
};

export default function ConfirmDeleteModalDiet({
  open,
  onCloseAction,
  onConfirmAction,
  dietName,
  isDeleting = false,
}: ConfirmDeleteModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onCloseAction}>
      <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-gray-800">
              Eliminar dieta
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600 text-base">
            ¿Estás seguro de que quieres eliminar la dieta{" "}
            <span className="font-semibold text-gray-800">
              &quot;{dietName}&quot;
            </span>
            ? Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <AlertDialogCancel
            onClick={onCloseAction}
            disabled={isDeleting}
            className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmAction}
            disabled={isDeleting}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
          >
            {isDeleting ? "Eliminando..." : "Eliminar dieta"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
