import { Dumbbell } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  const isAuthenticated = Boolean(token?.value);

  return <HeaderClient isAuthenticated={isAuthenticated} />;
}

// Componente separado para el cliente
function HeaderClient({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">WorkoutHub</h1>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="/perfil"
              >
                Mi Perfil
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground transition-colors"
                href="/rutinas"
              >
                Rutinas
              </Link>

              <p>Welcome</p>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="h-8 px-3 rounded-md text-sm font-medium transition hover:bg-accent hover:text-accent-foreground">
                  Iniciar Sesión
                </button>
              </Link>
              <Link href="/register">
                <button className="h-8 px-3 rounded-md text-sm font-medium bg-blue-950 text-primary-foreground shadow-xs hover:bg-primary/90">
                  Registrar
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
