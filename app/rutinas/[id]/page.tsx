"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Plus, AlertCircle } from "lucide-react";
import { ExerciseI } from "@/app/shared/types";
import { ExerciseFormModal } from "../components/ExerciseFormModal";
import ConfirmDeleteExerciseModal from "../components/ConfirmDeleteExerciseModal";
import { useExercises } from "../hooks/exercises/useExercise";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RutinaDetallePage() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <RutinaDetalle />
    </QueryClientProvider>
  );
}

function RutinaDetalle() {
  const params = useParams();
  const routineId = parseInt(params?.id as string, 10);

  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<
    ExerciseI | undefined
  >();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<
    ExerciseI | undefined
  >();

  const { data: exercises = [], isLoading, error } = useExercises(routineId);

  // Handlers
  const handleCreateExercise = () => {
    setEditingExercise(undefined);
    setExerciseModalOpen(true);
  };
  const handleEditExercise = (exercise: ExerciseI) => {
    setEditingExercise(exercise);
    setExerciseModalOpen(true);
  };
  const handleDeleteClick = (exercise: ExerciseI) => {
    setExerciseToDelete(exercise);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setExerciseToDelete(undefined);
  };
  const handleCloseExerciseModal = () => {
    setExerciseModalOpen(false);
    setEditingExercise(undefined);
  };

  // Loading
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-500 text-lg text-center">
          Cargando ejercicios...
        </p>
      </div>
    );

  // Error
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center space-y-2 max-w-sm">
          <p className="text-red-600 font-medium">Error al cargar ejercicios</p>
          <p className="text-sm text-slate-500">
            {/* error puede ser unknown, mantené esto simple */}
            {(error as any)?.message ?? "Ha ocurrido un error"}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Back */}
        <Link
          href="/rutinas"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden xs:inline">Volver a rutinas</span>
          <span className="xs:hidden">Volver</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
                Ejercicios de la rutina
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {exercises.length} ejercicio{exercises.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleCreateExercise}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg sm:rounded-xl shadow-sm transition text-sm sm:text-base w-full sm:w-auto"
            >
              <Plus size={16} />
              <span className="sm:hidden">Agregar ejercicio</span>
              <span className="hidden sm:inline">Agregar</span>
            </button>
          </div>
        </div>

        {/* Lista - TABLA responsive */}
        {exercises.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-6 sm:p-8 text-center">
            <AlertCircle
              size={40}
              className="sm:hidden mx-auto text-slate-400 mb-3"
            />
            <AlertCircle
              size={48}
              className="hidden sm:block mx-auto text-slate-400 mb-3"
            />
            <h2 className="text-base sm:text-lg font-medium text-slate-800">
              No hay ejercicios aún
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              Agrega tu primer ejercicio para comenzar.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs sm:text-sm min-w-[500px]">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      Ejercicio
                    </th>
                    <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      Series
                    </th>
                    <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      Reps
                    </th>
                    <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      Peso (kg)
                    </th>
                    <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {exercises.map((exercise) => (
                    <tr
                      key={exercise.id}
                      className="border-t last:border-b hover:bg-slate-50 transition"
                    >
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="font-semibold text-slate-800 text-xs sm:text-sm">
                          {exercise.name}
                        </div>
                      </td>

                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-slate-600">
                        {exercise.sets ?? "-"}
                      </td>

                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-slate-600">
                        {exercise.reps ?? "-"}
                      </td>

                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-slate-600">
                        {exercise.weight ?? "-"}
                      </td>

                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                        <div className="flex justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEditExercise(exercise)}
                            className="p-1.5 sm:p-2 rounded-lg hover:bg-sky-50 text-slate-500 hover:text-sky-700 transition"
                            title="Editar ejercicio"
                            aria-label={`Editar ${exercise.name}`}
                          >
                            <Edit size={14} className="sm:hidden" />
                            <Edit size={16} className="hidden sm:block" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(exercise)}
                            className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition"
                            title="Eliminar ejercicio"
                            aria-label={`Eliminar ${exercise.name}`}
                          >
                            <Trash2 size={14} className="sm:hidden" />
                            <Trash2 size={16} className="hidden sm:block" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      <ExerciseFormModal
        open={exerciseModalOpen}
        onClose={handleCloseExerciseModal}
        exercise={editingExercise}
        routineId={routineId}
      />
      {exerciseToDelete && (
        <ConfirmDeleteExerciseModal
          open={deleteModalOpen}
          onClose={handleCloseDeleteModal}
          itemName={exerciseToDelete.name}
          routineId={routineId}
          exerciseId={exerciseToDelete.id}
        />
      )}
    </div>
  );
}
