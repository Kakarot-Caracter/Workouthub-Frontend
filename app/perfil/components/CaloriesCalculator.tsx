"use client";

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
  const height = parseInt(profileData.height) || 0;
  const age = parseInt(profileData.age) || 0;
  const weight = parseInt(profileData.weight) || 0;
  const gender = profileData.gender;

  // Fórmula de Benedict-Harris ORIGINAL (1919)
  const calculateBenedictHarrisOriginal = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;

    return Math.round(
      gender === "male"
        ? 66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age
        : 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age
    );
  };

  // Fórmula de Benedict-Harris REVISADA (1984) - Más precisa
  const calculateBenedictHarrisRevised = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;

    return Math.round(
      gender === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    );
  };

  // Fórmula de Mifflin-St Jeor (1990) - La más precisa actualmente
  const calculateMifflinStJeor = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;

    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    return Math.round(bmr);
  };

  // Fórmula de Katch-McArdle (requiere % de grasa corporal)
  // Usando estimación aproximada basada en edad y género
  const calculateKatchMcArdle = () => {
    if (height === 0 || age === 0 || weight === 0) return 0;

    // Estimación aproximada de % grasa corporal
    let bodyFatPercentage;
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
      LIGHT: 1.375, // Ejercicio ligero 1-3 días/semana
      MODERATE: 1.55, // Ejercicio moderado 3-5 días/semana
      INTENSE: 1.725, // Ejercicio intenso 6-7 días/semana
    };

    const factor =
      activityFactors[
        profileData.weeklyActivity as keyof typeof activityFactors
      ] || 1.2;
    return Math.round(bmr * factor);
  };

  // Calculamos con todas las fórmulas
  const benedictHarrisOriginal = calculateBenedictHarrisOriginal();
  const benedictHarrisRevised = calculateBenedictHarrisRevised();
  const mifflinStJeor = calculateMifflinStJeor();
  const katchMcArdle = calculateKatchMcArdle();

  // Usamos Mifflin-St Jeor como referencia principal (más precisa)
  const mainBMR = mifflinStJeor;
  const maintenanceCalories = calculateTotalCalories(mainBMR);

  // Ajustes más realistas basados en estudios recientes
  const bulkCalories = maintenanceCalories + 350; // 300-500 es óptimo
  const cutCalories = maintenanceCalories - 400; // 300-500 para pérdida gradual

  return (
    <section className="text-left max-w-full mx-auto">
      <h2 className="font-semibold text-base sm:text-lg md:text-xl mb-3">
        Calculadora de Calorías Avanzada
      </h2>

      {mainBMR > 0 ? (
        <div className="space-y-4">
          {/* Resultado principal */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="font-semibold text-sm mb-2 text-blue-800">
              📊 Recomendación Principal (Mifflin-St Jeor - Más Precisa)
            </h3>
            <dl className="text-xs sm:text-sm text-gray-700 space-y-1">
              <div className="flex justify-between">
                <dt>BMR (Metabolismo Basal):</dt>
                <dd className="font-semibold">
                  {mainBMR.toLocaleString("es-ES")} cal
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Mantenimiento:</dt>
                <dd className="font-semibold">
                  {maintenanceCalories.toLocaleString("es-ES")} cal
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Ganar peso (+350 cal):</dt>
                <dd className="font-semibold text-green-600">
                  {bulkCalories.toLocaleString("es-ES")} cal
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Perder peso (-400 cal):</dt>
                <dd className="font-semibold text-red-600">
                  {cutCalories.toLocaleString("es-ES")} cal
                </dd>
              </div>
            </dl>
          </div>

          {/* Comparación de fórmulas */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="font-semibold text-sm mb-2 text-gray-800">
              🔬 Comparación de Fórmulas (Solo BMR)
            </h3>
            <dl className="text-xs text-gray-600 space-y-1">
              <div className="flex justify-between">
                <dt>Benedict-Harris Original (1919):</dt>
                <dd>{benedictHarrisOriginal.toLocaleString("es-ES")} cal</dd>
              </div>
              <div className="flex justify-between">
                <dt>Benedict-Harris Revisada (1984):</dt>
                <dd>{benedictHarrisRevised.toLocaleString("es-ES")} cal</dd>
              </div>
              <div className="flex justify-between font-semibold text-blue-700">
                <dt>Mifflin-St Jeor (1990):</dt>
                <dd>{mifflinStJeor.toLocaleString("es-ES")} cal</dd>
              </div>
              <div className="flex justify-between">
                <dt>Katch-McArdle (estimado):</dt>
                <dd>{katchMcArdle.toLocaleString("es-ES")} cal</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          Complete los campos para ver cálculos.
        </p>
      )}
    </section>
  );
}
