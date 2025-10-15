"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Check } from "lucide-react";
import { useUsers } from "../hooks/users/useUser";
import { useUpdateUser } from "../hooks/users/useUpdateUser";
import CaloriesCalculator from "./CaloriesCalculator";
import type { UserI } from "@/app/shared/types";

type ProfileData = {
  height: string;
  age: string;
  weight: string;
  gender: string;
  weeklyActivity: string;
};

// Tipo para el payload de actualización usando los tipos de UserI
type UpdatePayload = Partial<
  Pick<UserI, "height" | "age" | "weight" | "gender" | "weeklyActivity">
>;

// Tipo para las opciones de select
type SelectOption = {
  value: string;
  label: string;
};

// Tipos para los campos del formulario
type BaseField = {
  label: string;
  key: keyof ProfileData;
};

type InputField = BaseField & {
  type?: never;
  options?: never;
};

type SelectField = BaseField & {
  type: "select";
  options: SelectOption[];
};

type Field = InputField | SelectField;

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
  const [editField, setEditField] = useState<string | null>(null);
  const [savingField, setSavingField] = useState<string | null>(null);

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
      payload[key] = profile[key]
        ? (String(profile[key]).toLowerCase() as UserI["gender"])
        : null;
    } else if (key === "weeklyActivity") {
      payload[key] = profile[key]
        ? (String(profile[key]).toUpperCase() as UserI["weeklyActivity"])
        : null;
    }

    console.log("Payload a enviar:", payload);

    try {
      await updateUser.mutateAsync(payload);
    } catch (err) {
      console.error("Error guardando:", err);
    } finally {
      setSavingField(null);
    }
  };

  const display = (key: keyof ProfileData, value: string) => {
    if (!value) return "-";
    if (key === "gender") return value === "male" ? "Hombre" : "Mujer";
    if (key === "weeklyActivity") {
      if (value === "LIGHT") return "Ligera (1-3)";
      if (value === "MODERATE") return "Moderada (3-5)";
      if (value === "INTENSE") return "Intensa (6-7)";
    }
    return value;
  };

  if (isLoading) return <div>Cargando…</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!user) return <div>No se encontró usuario.</div>;

  const fields: Field[] = [
    { label: "Altura (cm)", key: "height" },
    { label: "Edad", key: "age" },
    { label: "Peso (kg)", key: "weight" },
    {
      label: "Sexo",
      key: "gender",
      type: "select",
      options: [
        { value: "male", label: "Hombre" },
        { value: "female", label: "Mujer" },
      ],
    },
    {
      label: "Actividad",
      key: "weeklyActivity",
      type: "select",
      options: [
        { value: "LIGHT", label: "1-3 veces/semana" },
        { value: "MODERATE", label: "3-5 veces/semana" },
        { value: "INTENSE", label: "6-7 veces/semana" },
      ],
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {fields.map((f) => {
          const key = f.key as keyof ProfileData;
          const isEditing = editField === f.key;
          return (
            <div key={f.key} className="p-2 border rounded">
              <div className="flex items-center justify-between">
                <strong className="text-xs">{f.label}</strong>
                {!isEditing && (
                  <Pencil
                    className="w-4 h-4 text-gray-500 cursor-pointer"
                    onClick={() => setEditField(f.key)}
                  />
                )}
              </div>

              {isEditing ? (
                <div className="mt-2 flex items-center gap-2">
                  {f.type === "select" ? (
                    <select
                      value={profile[key]}
                      onChange={(e) => change(key, e.target.value)}
                      className="rounded border px-2 py-1"
                      autoFocus
                    >
                      {f.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={profile[key]}
                      onChange={(e) => change(key, e.target.value)}
                      className="rounded border px-2 py-1 w-24"
                      autoFocus
                    />
                  )}
                  <button onClick={() => save(key)} className="p-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </button>
                </div>
              ) : (
                <div className="mt-2 text-sm">
                  {display(key, profile[key])}
                  {savingField === key && (
                    <span className="ml-2 text-xs text-gray-600">
                      Guardando...
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <CaloriesCalculator profileData={profile} />
      </div>
    </div>
  );
}
