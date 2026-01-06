"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { RoutineI } from "@/app/shared/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { queryClient } from "@/lib/queryClient";
import ConfirmDeleteModalRoutine from "./components/ConfirmDeleteFormRoutine";
import RoutineCard from "./components/RoutineCard";
import RoutineFormModal from "./components/RoutineFormModal";
import { useDeleteRoutine } from "./hooks/routines/useDeleteRoutine";
import { useRoutines } from "./hooks/routines/useRoutine";
import { PrivateRoute } from "@/lib/PrivateRoute";

export default function RutinasPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivateRoute>
        <RutinasContent />
      </PrivateRoute>
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

  console.log("routines", routines);
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
      <section className="w-full py-12 sm:py-16 px-4 relative">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando rutinas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12 sm:py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <h3 className="font-semibold mb-2">Error al cargar las rutinas</h3>
            <p>{error.message}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-200/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="gap-2 mb-6 text-gray-600 hover:text-blue-600"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Mis Rutinas
              </h1>
              <p className="text-gray-600 mt-2">
                Gestiona y organiza tus rutinas de entrenamiento
              </p>
            </div>

            <Button
              onClick={handleOpenCreateModal}
              className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              <Plus className="w-4 h-4" />
              Nueva Rutina
            </Button>
          </div>
        </div>

        {/* Rutinas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="col-span-full">
              <Card className="border-dashed border-2 border-gray-300 bg-transparent">
                <CardContent className="py-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Plus className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    No tienes rutinas creadas
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Crea tu primera rutina para comenzar tu entrenamiento
                  </p>
                  <Button
                    onClick={handleOpenCreateModal}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Crear primera rutina
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add New Card - Only show if there are routines */}
          {routines.length > 0 && (
            <Card
              className="border-dashed border-2 border-gray-300 bg-transparent hover:bg-gray-50/50 cursor-pointer transition-colors"
              onClick={handleOpenCreateModal}
            >
              <CardContent className="flex flex-col items-center justify-center py-12 h-full">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Agregar nueva rutina
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  Crea una nueva rutina personalizada
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      <RoutineFormModal
        open={open}
        onCloseAction={handleCloseModal}
        routine={editingRoutine}
      />

      <ConfirmDeleteModalRoutine
        open={deleteModalOpen}
        onCloseAction={handleCloseDeleteModal}
        onConfirmAction={handleConfirmDelete}
        routineName={routineToDelete?.name || ""}
        isDeleting={deleteRoutine.isPending}
      />
    </section>
  );
}
