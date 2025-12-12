"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Dumbbell,
  Sparkles,
  Pen,
  PenIcon,
  TrashIcon,
} from "lucide-react";
import { ExerciseI } from "@/app/shared/types";
import { ExerciseFormModal } from "../components/ExerciseFormModal";
import ConfirmDeleteExerciseModal from "../components/ConfirmDeleteExerciseModal";
import { useExercises } from "../hooks/exercises/useExercise";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <section className="w-full py-12 sm:py-16 px-4 relative">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando ejercicios...</p>
        </div>
      </section>
    );

  // Error
  if (error)
    return (
      <section className="w-full py-12 sm:py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-red-700 mb-2">
                  Error al cargar ejercicios
                </h3>
                <p className="text-red-600">
                  {error instanceof Error
                    ? error.message
                    : "Ha ocurrido un error"}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );

  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 relative min-h-screen">
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
            asChild
          >
            <Link href="/rutinas">
              <ArrowLeft className="w-4 h-4" />
              Volver a rutinas
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Ejercicios de la Rutina
              </h1>
              <p className="text-gray-600 mt-2">
                Gestiona los ejercicios de tu rutina de entrenamiento
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                {exercises.length} ejercicio{exercises.length !== 1 ? "s" : ""}
              </div>
              <Button
                onClick={handleCreateExercise}
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Plus className="w-4 h-4" />
                Agregar Ejercicio
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {exercises.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300 bg-transparent">
            <CardContent className="py-16 text-center">
              <div className="text-gray-400 mb-4">
                <Dumbbell className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                No hay ejercicios aún
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Agrega tu primer ejercicio para comenzar a entrenar con esta
                rutina.
              </p>
              <Button
                onClick={handleCreateExercise}
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Plus className="w-4 h-4" />
                Crear primer ejercicio
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Lista de Ejercicios
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Haz clic en un ejercicio para editarlo o eliminarlo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">
                        Ejercicio
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Series
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Repeticiones
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Peso (kg)
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Acciones
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exercises.map((exercise) => (
                      <TableRow
                        key={exercise.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-800">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {exercise.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium">
                            {exercise.sets ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-teal-50 rounded-full text-sm font-medium">
                            {exercise.reps ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-violet-50 rounded-full text-sm font-medium">
                            {exercise.weight ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                              onClick={() => handleEditExercise(exercise)}
                            >
                              <span className="sr-only">Editar</span>
                              <PenIcon />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteClick(exercise)}
                            >
                              <span className="sr-only">Eliminar</span>
                              <TrashIcon />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
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
    </section>
  );
}
