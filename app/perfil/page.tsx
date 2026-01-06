"use client";

import Link from "next/link";
import { ProfileSectionClient } from "./components/wrappers/ProfileSectionClient";
import { PrivateRoute } from "@/lib/PrivateRoute";

export default function ProfileCardWithSmallSave() {
  return (
    <PrivateRoute>
      <section className="w-full py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-2 sm:px-4  flex flex-col  justify-center items-center">
        <header className="mb-4 sm:mb-6 md:mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-950 font-medium hover:underline mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base"
          >
            Volver al inicio
          </Link>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950">
            WorkoutHub - Giovanni Martinez
          </h1>
        </header>

        <ProfileSectionClient />
      </section>
    </PrivateRoute>
  );
}
