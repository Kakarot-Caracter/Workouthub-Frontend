"use client";

import { Activity, Calendar, Pencil, Ruler, Scale, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { UserI } from "@/app/shared/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUser } from "../hooks/users/useUpdateUser";
import { useUsers } from "../hooks/users/useUser";
import CaloriesCalculator from "./CaloriesCalculator";

type ProfileData = {
  height: string;
  age: string;
  weight: string;
  gender: string;
  weeklyActivity: string;
};

type UpdatePayload = Partial<
  Pick<UserI, "height" | "age" | "weight" | "gender" | "weeklyActivity">
>;

type FieldConfig = {
  key: keyof ProfileData;
  label: string;
  icon: React.ReactNode;
  type: "input" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
};

export default function ProfileSection() {
  const { data, isLoading, isError, error } = useUsers();
  const updateUser = useUpdateUser();
  const user: UserI | undefined = Array.isArray(data)
    ? data?.[0]
    : (data as UserI | undefined);

  const [profile, setProfile] = useState({
    height: "",
    age: "",
    weight: "",
    gender: "",
    weeklyActivity: "",
  });

  const [editField, setEditField] = useState<keyof ProfileData | null>(null);
  const [savingField, setSavingField] = useState<keyof ProfileData | null>(
    null,
  );

  useEffect(() => {
    if (!user) return;
    setProfile({
      height: user.height != null ? String(user.height) : "",
      age: user.age != null ? String(user.age) : "",
      weight: user.weight != null ? String(user.weight) : "",
      gender: user.gender ? String(user.gender).toLowerCase() : "",
      weeklyActivity: user.weeklyActivity ?? "",
    });
  }, [user]);

  const change = (key: keyof ProfileData, value: string) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const save = async (key: keyof ProfileData) => {
    setEditField(null);
    setSavingField(key);

    const payload: UpdatePayload = {};

    if (key === "height" || key === "age" || key === "weight") {
      payload[key] = profile[key] === "" ? null : Number(profile[key]);
    } else if (key === "gender") {
      const genderValue = profile[key].trim();
      payload[key] = genderValue
        ? (genderValue.toLowerCase() as UserI["gender"])
        : null;
    } else if (key === "weeklyActivity") {
      const activityValue = profile[key].trim();
      payload[key] = activityValue
        ? (activityValue.toUpperCase() as UserI["weeklyActivity"])
        : null;
    }

    try {
      await updateUser.mutateAsync(payload);
    } catch (err) {
      console.error("Error guardando:", err);
      setEditField(key);
    } finally {
      setSavingField(null);
    }
  };

  const display = (key: keyof ProfileData, value: string) => {
    if (!value || value.trim() === "") return "-";
    if (key === "gender") {
      const genderValue = value.toLowerCase();
      return genderValue === "male"
        ? "Hombre"
        : genderValue === "female"
          ? "Mujer"
          : value;
    }
    if (key === "weeklyActivity") {
      const activityValue = value.toUpperCase();
      if (activityValue === "LIGHT") return "Ligera (1-3 días)";
      if (activityValue === "MODERATE") return "Moderada (3-5 días)";
      if (activityValue === "INTENSE") return "Intensa (6-7 días)";
    }
    return value;
  };

  const fields: FieldConfig[] = [
    {
      key: "height",
      label: "Altura",
      icon: <Ruler className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />,
      type: "input",
      placeholder: "cm",
    },
    {
      key: "age",
      label: "Edad",
      icon: <Calendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />,
      type: "input",
      placeholder: "años",
    },
    {
      key: "weight",
      label: "Peso",
      icon: <Scale className="w-4 h-4 md:w-5 md:h-5 text-green-600" />,
      type: "input",
      placeholder: "kg",
    },
    {
      key: "gender",
      label: "Sexo",
      icon: <User className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />,
      type: "select",
      options: [
        { value: "male", label: "Hombre" },
        { value: "female", label: "Mujer" },
      ],
    },
    {
      key: "weeklyActivity",
      label: "Actividad Semanal",
      icon: <Activity className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />,
      type: "select",
      options: [
        { value: "LIGHT", label: "Ligera (1-3 días)" },
        { value: "MODERATE", label: "Moderada (3-5 días)" },
        { value: "INTENSE", label: "Intensa (6-7 días)" },
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4 bg-gradient-to-br from-blue-50 to-teal-50/30 rounded-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-sm md:text-base text-gray-600">
            Cargando información del perfil...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4 bg-gradient-to-br from-blue-50 to-teal-50/30 rounded-2xl border border-blue-100">
        <div className="text-center max-w-md">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-orange-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Error al cargar el perfil
          </h3>
          <p className="text-sm text-gray-600 mb-4">{error?.message}</p>
          <Button
            variant="outline"
            size="sm"
            className="border-orange-600 text-orange-600 hover:bg-orange-50"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4 bg-gradient-to-br from-blue-50 to-teal-50/30 rounded-2xl border border-blue-100">
        <div className="text-center max-w-md">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No se encontró usuario
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Por favor, intenta recargar la página o verifica tu conexión.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => window.location.reload()}
          >
            Recargar página
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-teal-50/30 rounded-2xl border border-blue-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => {
          const key = field.key;
          const isEditing = editField === key;
          const value = profile[key];

          return (
            <div
              key={key}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-blue-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg border border-blue-100">
                    {field.icon}
                  </div>
                  <Label className="text-sm font-medium text-gray-800">
                    {field.label}
                  </Label>
                </div>

                {!isEditing && !savingField && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                    onClick={() => setEditField(key)}
                  >
                    <Pencil className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  {field.type === "select" ? (
                    <Select
                      value={value}
                      onValueChange={(val) => change(key, val)}
                    >
                      <SelectTrigger className="w-full text-xs md:text-sm border-blue-200 focus:ring-blue-500">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => change(key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full text-xs md:text-sm border-blue-200 focus:ring-blue-500"
                    />
                  )}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => setEditField(null)}
                      disabled={savingField === key}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs bg-gradient-to-br from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                      onClick={() => save(key)}
                      disabled={savingField === key}
                    >
                      {savingField === key ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                          Guardando...
                        </span>
                      ) : (
                        "Guardar"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xl font-semibold mb-1 text-gray-800">
                    {display(key, value)}
                  </p>
                  {savingField === key && (
                    <div className="flex items-center mt-2">
                      <span className="animate-spin h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></span>
                      <span className="text-xs text-gray-600">
                        Guardando...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 md:mt-8">
        <CaloriesCalculator profileData={profile} />
      </div>
    </div>
  );
}
