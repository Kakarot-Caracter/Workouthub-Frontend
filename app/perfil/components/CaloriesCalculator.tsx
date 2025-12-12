"use client";

import { Zap } from "lucide-react";

interface ProfileData {
  height: string;
  age: string;
  weight: string;
  gender: string;
  weeklyActivity: string;
}

interface Props {
  profileData: ProfileData;
}

export default function CaloriesCalculator({ profileData }: Props) {
  // FUNCIONALIDAD ORIGINAL - SIN CAMBIOS
  const height = parseInt(profileData.height, 10) || 0;
  const age = parseInt(profileData.age, 10) || 0;
  const weight = parseInt(profileData.weight, 10) || 0;
  const gender = profileData.gender;

  const calculateBenedictHarrisOriginal = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;
    return Math.round(
      gender === "male"
        ? 66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age
        : 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age,
    );
  };

  const calculateBenedictHarrisRevised = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;
    return Math.round(
      gender === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age,
    );
  };

  const calculateMifflinStJeor = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    return Math.round(bmr);
  };

  const calculateKatchMcArdle = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;
    let bodyFatPercentage: number;

    if (gender === "male") {
      bodyFatPercentage = Math.min(Math.max(age / 2 + 5, 8), 25);
    } else {
      bodyFatPercentage = Math.min(Math.max(age / 2 + 12, 16), 35);
    }
    const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
    return Math.round(370 + 21.6 * leanBodyMass);
  };

  const calculateTotalCalories = (bmr: number) => {
    if (bmr === 0) return 0;
    const activityFactors = {
      LIGHT: 1.375,
      MODERATE: 1.55,
      INTENSE: 1.725,
    };
    const factor =
      activityFactors[
        profileData.weeklyActivity as keyof typeof activityFactors
      ] || 1.2;
    return Math.round(bmr * factor);
  };

  const benedictHarrisOriginal = calculateBenedictHarrisOriginal();
  const benedictHarrisRevised = calculateBenedictHarrisRevised();
  const mifflinStJeor = calculateMifflinStJeor();
  const katchMcArdle = calculateKatchMcArdle();
  const mainBMR = mifflinStJeor;
  const maintenanceCalories = calculateTotalCalories(mainBMR);
  const bulkCalories = maintenanceCalories + 350;
  const cutCalories = maintenanceCalories - 400;

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-teal-50/30 rounded-2xl border border-blue-100 p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="flex-shrink-0 p-2 md:p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl shadow-md">
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 truncate">
            Calculadora de Calorías
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1">
            Calcula tu metabolismo basal y necesidades calóricas
          </p>
        </div>
      </div>

      {mainBMR > 0 ? (
        <div className="space-y-6 md:space-y-8">
          <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 lg:p-6 border border-gray-200 shadow-sm">
            <div className="mb-4 md:mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <div className="flex-shrink-0 p-1.5 md:p-2 bg-blue-100 rounded-lg">
                  <span className="text-blue-600 text-sm md:text-base">📊</span>
                </div>
                <span className="text-sm md:text-base lg:text-lg">
                  Recomendación Principal (Mifflin-St Jeor)
                </span>
              </h3>
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="w-full text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="text-xs md:text-sm text-gray-600 mb-1 truncate">
                  Metabolismo Basal
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 break-words">
                  {mainBMR.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">cal/día</div>
              </div>

              <div className="w-full text-center p-3 md:p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                <div className="text-xs md:text-sm text-gray-600 mb-1 truncate">
                  Mantenimiento
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-700 break-words">
                  {maintenanceCalories.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">cal/día</div>
              </div>

              <div className="w-full text-center p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-xs md:text-sm text-gray-600 mb-1 truncate">
                  Ganar Peso
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 break-words">
                  {bulkCalories.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">+350 cal</div>
              </div>

              <div className="w-full text-center p-3 md:p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="text-xs md:text-sm text-gray-600 mb-1 truncate">
                  Perder Peso
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-700 break-words">
                  {cutCalories.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">-400 cal</div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 lg:p-6 border border-gray-200 shadow-sm">
            <div className="mb-4 md:mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <div className="flex-shrink-0 p-1.5 md:p-2 bg-purple-100 rounded-lg">
                  <span className="text-purple-600 text-sm md:text-base">
                    🔬
                  </span>
                </div>
                <span className="text-sm md:text-base lg:text-lg">
                  Comparación de Fórmulas (Metabolismo Basal)
                </span>
              </h3>
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="w-full text-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="text-xs md:text-sm text-gray-600 mb-1 line-clamp-2 min-h-[2.5rem]">
                  Benedict-Harris (1919)
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 break-words">
                  {benedictHarrisOriginal.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">cal</div>
              </div>

              <div className="w-full text-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="text-xs md:text-sm text-gray-600 mb-1 line-clamp-2 min-h-[2.5rem]">
                  Benedict-Harris (1984)
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 break-words">
                  {benedictHarrisRevised.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">cal</div>
              </div>

              <div className="w-full text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-300 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] xs:text-xs px-2 py-0.5 md:px-2.5 md:py-1 rounded-full whitespace-nowrap">
                  Recomendado
                </div>
                <div className="text-xs md:text-sm text-blue-600 mb-1 line-clamp-2 min-h-[2.5rem]">
                  Mifflin-St Jeor (1990)
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700 break-words">
                  {mifflinStJeor.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-blue-600 mt-1">Más preciso</div>
              </div>

              <div className="w-full text-center p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="text-xs md:text-sm text-gray-600 mb-1 line-clamp-2 min-h-[2.5rem]">
                  Katch-McArdle
                </div>
                <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 break-words">
                  {katchMcArdle.toLocaleString("es-ES")}
                </div>
                <div className="text-xs text-gray-500 mt-1">estimado</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-center py-8 md:py-10">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full mb-3 md:mb-4">
            <span className="text-xl md:text-2xl text-blue-600">📏</span>
          </div>
          <h3 className="font-medium text-gray-700 mb-2 text-sm md:text-base">
            Completa tu perfil
          </h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto px-4">
            Ingresa tu altura, peso, edad y actividad para ver tus cálculos
            calóricos
          </p>
        </div>
      )}
    </div>
  );
}
