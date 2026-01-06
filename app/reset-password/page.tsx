import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage"; 
export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
