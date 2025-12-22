"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ArrowLeft,
  Apple,
  PenIcon,
  Plus,
  TrashIcon,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { FoodI } from "@/app/shared/types";
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
import ConfirmDeleteFoodModal from "../components/ConfirmFoodModal";
import { useFoods } from "../hooks/foods/useFood";
import { FoodFormModal } from "../components/FoodFormModal";

export default function DietaDetallePage() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <DietaDetalle />
    </QueryClientProvider>
  );
}

function DietaDetalle() {
  const params = useParams();
  const dietId = parseInt(params?.id as string, 10);

  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodI | undefined>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState<FoodI | undefined>();

  const { data, isLoading, error } = useFoods(dietId);
  const foods = data?.foods || [];

  const handleCreateFood = () => {
    setEditingFood(undefined);
    setFoodModalOpen(true);
  };
  const handleEditFood = (food: FoodI) => {
    setEditingFood(food);
    setFoodModalOpen(true);
  };
  const handleDeleteClick = (food: FoodI) => {
    setFoodToDelete(food);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setFoodToDelete(undefined);
  };
  const handleCloseFoodModal = () => {
    setFoodModalOpen(false);
    setEditingFood(undefined);
  };

  if (isLoading)
    return (
      <section className="w-full py-12 sm:py-16 px-4 relative">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando alimentos...</p>
        </div>
      </section>
    );

  if (error)
    return (
      <section className="w-full py-12 sm:py-16 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-semibold text-red-700 mb-2">
                  Error al cargar alimentos
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50/30" />
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-green-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="gap-2 mb-6 text-gray-600 hover:text-blue-600"
            asChild
          >
            <Link href="/dietas">
              <ArrowLeft className="w-4 h-4" />
              Volver a dietas
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Alimentos de la Dieta
              </h1>
              <p className="text-gray-600 mt-2">
                Gestiona los alimentos de tu plan de alimentación
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-700">
                {foods.length} alimento{foods.length !== 1 ? "s" : ""}
              </div>
              <Button
                onClick={handleCreateFood}
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Plus className="w-4 h-4" />
                Agregar Alimento
              </Button>
            </div>
          </div>
        </div>

        {foods.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300 bg-transparent">
            <CardContent className="py-16 text-center">
              <div className="text-gray-400 mb-4">
                <Apple className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                No hay alimentos aún
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Agrega tu primer alimento para comenzar a planificar tu dieta.
              </p>
              <Button
                onClick={handleCreateFood}
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Plus className="w-4 h-4" />
                Crear primer alimento
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Lista de Alimentos
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Haz clic en un alimento para editarlo o eliminarlo
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-gray-50 to-green-50/50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">
                        Alimento
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Calorías
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Proteínas (g)
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Carbohidratos (g)
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Grasas (g)
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Acciones
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foods.map((food) => (
                      <TableRow
                        key={food.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-800">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {food.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-yellow-50 rounded-full text-sm font-medium">
                            {food.calories ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium">
                            {food.protein ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-orange-50 rounded-full text-sm font-medium">
                            {food.carbs ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-gray-600">
                          <span className="px-3 py-1 bg-red-50 rounded-full text-sm font-medium">
                            {food.fat ?? "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-green-600 hover:bg-green-50"
                              onClick={() => handleEditFood(food)}
                            >
                              <span className="sr-only">Editar</span>
                              <PenIcon />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteClick(food)}
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

      <FoodFormModal
        open={foodModalOpen}
        onClose={handleCloseFoodModal}
        food={editingFood}
        dietId={dietId}
      />
      {foodToDelete && (
        <ConfirmDeleteFoodModal
          open={deleteModalOpen}
          onCloseAction={handleCloseDeleteModal}
          itemName={foodToDelete.name}
          dietId={dietId}
          foodId={foodToDelete.id}
        />
      )}
    </section>
  );
}
