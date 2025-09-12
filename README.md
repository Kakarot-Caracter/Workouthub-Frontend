# WorkoutHub Frontend

**WorkoutHub Frontend** es una aplicación web moderna y dinámica desarrollada con Next.js y TypeScript, diseñada para ser la interfaz de usuario de una plataforma de fitness y entrenamiento. La aplicación permite a los usuarios registrarse, gestionar sus perfiles personales y, lo más importante, crear, visualizar y administrar sus propias rutinas de ejercicios de forma intuitiva.

La página de inicio actúa como un portal de marketing, presentando las características clave de la aplicación, testimonios de usuarios y llamadas a la acción para atraer y registrar a nuevos usuarios.

## ✨ Características Principales

*   **Autenticación de Usuarios:** Sistema completo con formularios para registro (`/register`) e inicio de sesión (`/login`).
*   **Gestión de Perfil de Usuario (`/perfil`):**
    *   Una sección dedicada donde los usuarios pueden ver y actualizar su información.
    *   Incluye una **Calculadora de Calorías**, una herramienta de valor añadido para los usuarios.
*   **Gestión de Rutinas de Ejercicio (`/rutinas`):**
    *   El corazón de la aplicación, donde los usuarios pueden crear, editar y eliminar sus rutinas de entrenamiento.
    *   Permite añadir, modificar y eliminar ejercicios específicos dentro de cada rutina.
    *   Interfaz modal para una experiencia de usuario fluida al gestionar rutinas y ejercicios.
*   **Página de Aterrizaje (Landing Page):**
    *   Componentes dedicados como `Hero`, `KeyFeatures` (Características Clave), y `UsersTestimonials` (Testimonios) para presentar la aplicación.

## 🚀 Resumen Técnico

*   **Framework Principal:** [Next.js](https://nextjs.org/) (versión 15) con App Router y Turbopack.
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/).
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/).
*   **Gestión de Estado:**
    *   **Estado del Servidor:** [TanStack React Query](https://tanstack.com/query/latest).
    *   **Estado del Cliente:** [Zustand](https://zustand-demo.pmnd.rs/).
*   **Formularios:** [React Hook Form](https://react-hook-form.com/) y [Zod](https://zod.dev/) para validación.
*   **Componentes de UI:** Basado en la estructura, probablemente [Shadcn/ui](https://ui.shadcn.com/).
*   **Iconografía:** [Lucide React](https://lucide.dev/).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.