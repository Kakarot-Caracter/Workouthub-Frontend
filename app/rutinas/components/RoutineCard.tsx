"use client";

import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import type { RoutineI } from "@/app/shared/types";

type RoutineCardProps = {
  routine: RoutineI;
  onEdit: () => void;
  onDelete: () => void;
};

export default function RoutineCard({
  routine,
  onEdit,
  onDelete,
}: RoutineCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <div>
        <h2 className="text-sky-900 font-semibold text-lg">{routine.name}</h2>
        <p className="mt-3 text-sm text-slate-500">
          {routine.description || "Sin descripción"}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/rutinas/${routine.id}`}
          className="inline-block w-36 text-center py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-slate-700 transition-colors"
        >
          Ver rutina
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
            title="Editar rutina"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 text-black hover:bg-red-100 rounded-lg transition-colors"
            title="Eliminar rutina"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
