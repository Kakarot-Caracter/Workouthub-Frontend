// page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useDeleteRoutine } from "./hooks/routines/useDeleteRoutine";
import { useRoutines } from "./hooks/routines/useRoutine";
import type { RoutineI } from "@/app/shared/types";
import RoutineCard from "./components/RoutineCard";
import RoutineFormModal from "./components/RoutineFormModal";
import ConfirmDeleteModalRoutine from "./components/ConfirmDeleteFormRoutine";

export default function RutinasPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <RutinasContent />
    </QueryClientProvider>
  );
}

function RutinasContent() {
  const [open, setOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<RoutineI | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [routineToDelete, setRoutineToDelete] = useState<
    RoutineI | undefined
  >();
  const router = useRouter();

  const { data, isLoading, error } = useRoutines();
  const deleteRoutine = useDeleteRoutine();

  const routines: RoutineI[] = data?.routines || [];

  const handleEdit = (routine: RoutineI) => {
    setEditingRoutine(routine);
    setOpen(true);
  };

  const handleDeleteClick = (routine: RoutineI) => {
    setRoutineToDelete(routine);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!routineToDelete) return;

    try {
      await deleteRoutine.mutateAsync(routineToDelete.id);
      setDeleteModalOpen(false);
      setRoutineToDelete(undefined);
    } catch (error) {
      console.error("Error al eliminar rutina:", error);
      // Podrías mostrar un toast o notificación aquí
    }
  };

  const handleCloseDeleteModal = () => {
    if (!deleteRoutine.isPending) {
      setDeleteModalOpen(false);
      setRoutineToDelete(undefined);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingRoutine(undefined);
  };

  const handleOpenCreateModal = () => {
    setEditingRoutine(undefined);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center text-lg text-slate-600">
          Cargando rutinas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center text-red-600">
          Error al cargar las rutinas: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <div className="mb-6 flex items-center gap-3 text-slate-700">
          <button
            className="text-2xl leading-none"
            onClick={() => router.push("/")}
          >
            <span className="text-sm">← Volver al inicio</span>
          </button>
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {routines.length > 0 ? (
            routines.map((routine) => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onEdit={() => handleEdit(routine)}
                onDelete={() => handleDeleteClick(routine)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              <div className="text-lg mb-2">No tienes rutinas creadas</div>
              <div className="text-sm">
                Crea tu primera rutina haciendo clic en el botón de abajo
              </div>
            </div>
          )}

          {/* Card - Añadir nueva rutina */}
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 transition-colors min-h-[140px]"
          >
            <div className="text-center text-slate-500">
              <div className="text-3xl">+</div>
              <div className="mt-2 text-sm">Agregar nueva rutina</div>
            </div>
          </button>
        </section>
      </div>

      {/* Modal de formulario */}
      <RoutineFormModal
        open={open}
        onClose={handleCloseModal}
        routine={editingRoutine}
      />

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModalRoutine
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        routineName={routineToDelete?.name || ""}
        isDeleting={deleteRoutine.isPending}
      />
    </div>
  );
}
