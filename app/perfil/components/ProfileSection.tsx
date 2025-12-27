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
  unit?: string;
};

const genderLabels: Record<string, string> = {
  male: "Hombre",
  female: "Mujer",
};

const activityLabels: Record<string, string> = {
  LIGHT: "Ligera",
  MODERATE: "Moderada",
  INTENSE: "Intensa",
};

export default function ProfileSection() {
  const { data } = useUsers();
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

    const payload: UpdatePayload = {};

    if (key === "height" || key === "age" || key === "weight") {
      payload[key] = profile[key] === "" ? null : Number(profile[key]);
    }

    if (key === "gender") {
      payload.gender = profile.gender
        ? (profile.gender as UserI["gender"])
        : null;
    }

    if (key === "weeklyActivity") {
      payload.weeklyActivity = profile.weeklyActivity
        ? (profile.weeklyActivity as UserI["weeklyActivity"])
        : null;
    }

    await updateUser.mutateAsync(payload);
  };

  /* =========================
     CONFIG DE CAMPOS
  ========================= */

  const fields: FieldConfig[] = [
    {
      key: "height",
      label: "Altura",
      icon: <Ruler className="w-5 h-5 text-blue-600" />,
      type: "input",
      unit: "cm",
    },
    {
      key: "age",
      label: "Edad",
      icon: <Calendar className="w-5 h-5 text-emerald-600" />,
      type: "input",
      unit: "años",
    },
    {
      key: "weight",
      label: "Peso",
      icon: <Scale className="w-5 h-5 text-green-600" />,
      type: "input",
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
      label: "Actividad semanal",
      icon: <Activity className="w-5 h-5 text-orange-600" />,
      type: "select",
      options: [
        { value: "LIGHT", label: "Ligera (1-3 días)" },
        { value: "MODERATE", label: "Moderada (3-5 días)" },
        { value: "INTENSE", label: "Intensa (6-7 días)" },
      ],
    },
  ];

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Datos personales
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => {
            const value = profile[field.key];
            const isEditing = editField === field.key;

            return (
              <div
                key={field.key}
                className="border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {field.icon}
                    <Label className="text-sm">{field.label}</Label>
                  </div>

                  {!isEditing && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditField(field.key)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <>
                    {field.type === "select" ? (
                      <Select
                        value={value}
                        onValueChange={(v) => change(field.key, v)}
                      >
                        <SelectTrigger />
                        <SelectContent>
                          {field.options?.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) => change(field.key, e.target.value)}
                      />
                    )}

                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditField(null)}
                      >
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={() => save(field.key)}>
                        Guardar
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-lg font-semibold text-gray-800">
                    {(() => {
                      if (!value) return "-";
                      if (field.key === "gender")
                        return genderLabels[value] ?? value;
                      if (field.key === "weeklyActivity")
                        return activityLabels[value] ?? value;
                      return value;
                    })()}

                    {value && field.unit && (
                      <span className="text-sm text-gray-500 ml-1">
                        {field.unit}
                      </span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CALORÍAS */}
      <section>
        <CaloriesCalculator profileData={profile} />
      </section>
    </div>
  );
}
