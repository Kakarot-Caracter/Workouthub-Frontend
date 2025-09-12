"use client";

import { Profiler, useState } from "react";
import ProfileSection from "./components/ProfileSection";
import CaloriesCalculator from "./components/CaloriesCalculator";
import { ProfileSectionClient } from "./components/wrappers/ProfileSectionClient";

interface ProfileData {
  height: string;
  age: string;
  weight: string;
  gender: string;
  weeklyActivity: string;
}

export default function ProfileCardWithSmallSave() {
  return (
    <section className="w-full py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-2 sm:px-4 bg-gradient-to-br from-blue-100 to-gray-100 flex justify-center">
      <article className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl">
        <header className="mb-4 sm:mb-6 md:mb-8 text-center">
          <a
            href="/"
            className="inline-flex items-center text-blue-950 font-medium hover:underline mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base"
          >
            Volver al inicio
          </a>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950">
            WorkoutHub - Giovanni Martinez
          </h1>
        </header>

        <ProfileSectionClient />
      </article>
    </section>
  );
}
