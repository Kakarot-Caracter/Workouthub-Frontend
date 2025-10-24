<div align="center">
  <br />
  <h1>WorkoutHub Frontend</h1>
  <p>
    Frontend profesional para la gestión de rutinas de ejercicio y seguimiento de progreso, construido con Next.js, TypeScript y Tailwind CSS.
  </p>
</div>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js"/>
  <img alt="React" src="https://img.shields.io/badge/React-19.x-blue?style=for-the-badge&logo=react"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css"/>
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-5.x-orange?style=for-the-badge"/>
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query"/>
</p>

---

## ✨ Características

- **Autenticación Completa**: Flujo de registro e inicio de sesión para usuarios.
- **Rutas Protegidas**: Uso de Middleware de Next.js para proteger las páginas que requieren autenticación (perfil, rutinas).
- **Gestión de Rutinas y Ejercicios (CRUD)**: Funcionalidad completa para crear, leer, actualizar y eliminar rutinas y los ejercicios asociados a ellas.
- **Perfil de Usuario**: Sección de perfil personal con calculadora de calorías.
- **Manejo de Estado Global**: Estado centralizado y simplificado con Zustand para la sesión de usuario.
- **Fetching de Datos Moderno**: Uso de TanStack Query (React Query) para un fetching, cacheo y sincronización de datos eficiente con el backend.
- **UI Moderna y Responsiva**: Componentes reutilizables construidos con Tailwind CSS para una interfaz limpia y adaptable.
- **Formularios Validados**: Manejo de formularios robusto y con validaciones en tiempo real gracias a `react-hook-form` y `zod`.

---

## 🛠️ Stack de Tecnologías

- **Framework**: [Next.js](https://nextjs.org/)
- **Librería UI**: [React](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Manejo de Estado**: [Zustand](https://github.com/pmndrs/zustand)
- **Fetching de Datos**: [TanStack Query](https://tanstack.com/query/latest)
- **Manejo de Formularios**: [React Hook Form](https://react-hook-form.com/)
- **Validación de Esquemas**: [Zod](https://zod.dev/)

---

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto funcionando localmente.

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v20+ recomendado)
- [npm](https://www.npmjs.com/)

### 1. Clona el Repositorio

```bash
git clone https://github.com/tu-usuario/workouthub-frontend.git
cd workouthub-frontend
```

### 2. Configura las Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade la URL de tu API backend. Puedes usar el siguiente template:

```env
# URL del backend de WorkoutHub API
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### 3. Instala las Dependencias

```bash
npm install
```

### 4. ¡Inicia la Aplicación!

```bash
# Inicia el servidor en modo de desarrollo (con Turbopack)
npm run dev
```

¡Listo! La aplicación estará disponible en `http://localhost:3000`.

---

## 📂 Estructura del Proyecto

El proyecto sigue la convención del `App Router` de Next.js, organizando el código de manera modular y escalable.

```
/app
├── components/         # Componentes globales de la landing page (Header, Footer, etc.)
├── login/              # Página y componentes de inicio de sesión
├── register/           # Página y componentes de registro de usuario
├── perfil/             # Página y componentes del perfil de usuario
├── rutinas/            # Páginas y componentes para la gestión de rutinas y ejercicios
├── shared/             # Tipos y constantes compartidas en la aplicación
├── stores/             # Stores de Zustand para manejo de estado global (auth)
├── layout.tsx          # Layout principal de la aplicación
└── page.tsx            # Página de inicio (landing page)

/components/ui/         # Componentes de UI reutilizables (Button, Card, etc.)

/hooks/                 # Hooks personalizados para fetching de datos con TanStack Query

/lib/                   # Librerías, utilidades y configuración (cliente de Query, etc.)
```

---

## ⚙️ Scripts Útiles

| Script          | Descripción                                      |
| :-------------- | :----------------------------------------------- |
| `npm run dev`   | Inicia la app en modo desarrollo con Turbopack.  |
| `npm run build` | Compila el proyecto para producción.             |
| `npm run start` | Inicia la app en modo producción (requiere `build`).|
| `npm run lint`  | Analiza el código con ESLint en busca de errores.|

---

## 📄 Licencia

Este proyecto es de código privado y no tiene una licencia de código abierto.

UNLICENSED
