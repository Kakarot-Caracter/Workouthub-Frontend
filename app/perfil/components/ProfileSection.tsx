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
  unit?: string;
};

export default function ProfileSection() {
  const { data, isLoading, isError, error } = useUsers();
  const updateUser = useUpdateUser();

  const user: UserI | undefined = Array.isArray(data)
    ? data?.[0]
    : (data as UserI | undefined);

  const [profile, setProfile] = useState<ProfileData>({
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
      gender: user.gender ? user.gender.toLowerCase() : "",
      weeklyActivity: user.weeklyActivity ?? "",
    });
  }, [user]);

  const change = (key: keyof ProfileData, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  const save = async (key: keyof ProfileData) => {
    setEditField(null);
    setSavingField(key);

    const payload: UpdatePayload = {};

    if (key === "height" || key === "age" || key === "weight") {
      payload[key] = profile[key] === "" ? null : Number(profile[key]);
    }

    if (key === "gender") {
      payload.gender = profile.gender
        ? (profile.gender.toLowerCase() as UserI["gender"])
        : null;
    }

    if (key === "weeklyActivity") {
      payload.weeklyActivity = profile.weeklyActivity
        ? (profile.weeklyActivity.toUpperCase() as UserI["weeklyActivity"])
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
    if (!value) return "-";

    if (key === "gender") {
      return value === "male" ? "Hombre" : value === "female" ? "Mujer" : value;
    }

    if (key === "weeklyActivity") {
      if (value === "LIGHT") return "Ligera (1-3 días)";
      if (value === "MODERATE") return "Moderada (3-5 días)";
      if (value === "INTENSE") return "Intensa (6-7 días)";
    }

    return value;
  };

  const fields: FieldConfig[] = [
    {
      key: "height",
      label: "Altura",
      icon: <Ruler className="w-5 h-5 text-blue-600" />,
      type: "input",
      placeholder: "cm",
      unit: "cm",
    },
    {
      key: "age",
      label: "Edad",
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      type: "input",
      placeholder: "años",
      unit: "años",
    },
    {
      key: "weight",
      label: "Peso",
      icon: <Scale className="w-5 h-5 text-green-600" />,
      type: "input",
      placeholder: "kg",
      unit: "kg",
    },
    {
      key: "gender",
      label: "Sexo",
      icon: <User className="w-5 h-5 text-purple-600" />,
      type: "select",
      options: [
        { value: "male", label: "Hombre" },
        { value: "female", label: "Mujer" },
      ],
    },
    {
      key: "weeklyActivity",
      label: "Actividad Semanal",
      icon: <Activity className="w-5 h-5 text-orange-600" />,
      type: "select",
      options: [
        { value: "LIGHT", label: "Ligera (1-3 días)" },
        { value: "MODERATE", label: "Moderada (3-5 días)" },
        { value: "INTENSE", label: "Intensa (6-7 días)" },
      ],
    },
  ];

  if (isLoading) return <div>Cargando perfil...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!user) return <div>No se encontró usuario</div>;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-teal-50/30 rounded-2xl border border-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => {
          const key = field.key;
          const isEditing = editField === key;
          const value = profile[key];

          return (
            <div
              key={key}
              className="bg-white rounded-xl p-4 border border-blue-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {field.icon}
                  <Label>{field.label}</Label>
                </div>

                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditField(key)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {isEditing ? (
                <>
                  {field.type === "select" ? (
                    <Select value={value} onValueChange={(v) => change(key, v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="relative">
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => change(key, e.target.value)}
                        className="pr-12"
                      />
                      {field.unit && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                          {field.unit}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditField(null)}
                    >
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={() => save(key)}>
                      Guardar
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-xl font-semibold">
                  {display(key, value)}
                  {value && field.unit && (
                    <span className="ml-1 text-sm text-gray-500">
                      {field.unit}
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <CaloriesCalculator profileData={profile} />
    </div>
  );
}
