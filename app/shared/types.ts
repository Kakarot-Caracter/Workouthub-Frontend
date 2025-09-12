// Los enums que devuelve Prisma (en runtime son strings), los definimos como union types
export type Gender = "male" | "female";
export type WeeklyActivity = "LIGHT" | "MODERATE" | "INTENSE";

// Interfaz que representa el User que recibe el cliente desde la API
export interface UserI {
  id: number;
  username: string;
  email: string;
  // campos opcionales (nullable en Prisma)
  height?: number | null;
  age?: number | null;
  weight?: number | null;
  gender?: Gender | null;
  weeklyActivity?: WeeklyActivity | null;
  createdAt: string; // normalmente llega como ISO string
  updatedAt: string;
  // NO incluir password aquí (no deberías recibirla)
}

// Representa un ejercicio dentro de una rutina
export interface ExerciseI {
  id: number;
  name: string;

  weight?: number | null; // kg
  sets?: number | null;
  reps?: number | null;
  order?: number | null;
  createdAt: string; // llega como ISO string
  updatedAt: string;
  routineId: number;
}

// Representa una rutina (adaptado del modelo Prisma)
export interface RoutineI {
  id: number;
  name: string;
  description?: string | null;
  userId: number;
  exercises: ExerciseI[]; // relación 1-N
  createdAt: string; // ISO string
  updatedAt: string;
}

export interface ResponseI {
  message: string;
  routines: RoutineI[];
}

// DTOs para las mutaciones
export interface CreateExerciseDto {
  name: string;
  description?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  order?: number;
}

export interface UpdateExerciseDto {
  name?: string;
  description?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  order?: number;
}
