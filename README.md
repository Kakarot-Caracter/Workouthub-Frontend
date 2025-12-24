<div align="center">
  <br />
  <h1>WorkoutHub Frontend</h1>
  <p>
    Frontend profesional para la gestión de rutinas de ejercicio y dietas, construido con Next.js, TypeScript y Tailwind CSS.
  </p>
</div>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-^14.0.0-black?style=for-the-badge&logo=next.js"/>
  <img alt="React" src="https://img.shields.io/badge/React-^18.0.0-blue?style=for-the-badge&logo=react"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-^5.0.0-blue?style=for-the-badge&logo=typescript"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-^3.0.0-38B2AC?style=for-the-badge&logo=tailwind-css"/>
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-^4.0.0-orange?style=for-the-badge"/>
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query"/>
</p>

---

## ✨ Características

- **Autenticación Completa**: Flujo de registro e inicio de sesión para usuarios.
- **Rutas Protegidas**: Uso de Middleware de Next.js para proteger las páginas que requieren autenticación.
- **Gestión de Rutinas y Ejercicios (CRUD)**: Funcionalidad completa para crear, leer, actualizar y eliminar rutinas y ejercicios.
- **Gestión de Dietas y Alimentos (CRUD)**: Funcionalidad completa para crear, leer, actualizar y eliminar dietas y alimentos.
- **Perfil de Usuario**: Sección de perfil personal con calculadora de calorías.
- **Manejo de Estado Global**: Estado centralizado y simplificado con Zustand para la sesión de usuario.
- **Fetching de Datos Moderno**: Uso de TanStack Query (React Query) para un fetching, cacheo y sincronización de datos eficiente con el backend.
- **UI Moderna y Responsiva**: Componentes reutilizables construidos con Tailwind CSS y Shadcn/UI para una interfaz limpia y adaptable.
- **Formularios Validados**: Manejo de formularios robusto con validaciones en tiempo real gracias a `react-hook-form` y `zod`.

---

## 🛠️ Stack de Tecnologías

- **Framework**: [Next.js](https://nextjs.org/)
- **Librería UI**: [React](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn/UI](https://ui.shadcn.com/)
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

Crea un archivo `.env.local` en la raíz del proyecto y añade la URL de tu API backend.

```env
# URL del backend de WorkoutHub API
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### 3. Instala las Dependencias

```bash
npm install
```

### 4. Inicia la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

---

## 📂 Estructura del Proyecto

El proyecto sigue la convención del `App Router` de Next.js.

```
/app
├── components/         # Componentes de la landing page
├── dietas/             # Páginas y componentes para dietas
├── login/              # Página de inicio de sesión
├── perfil/             # Página del perfil de usuario
├── register/           # Página de registro
├── rutinas/            # Páginas para la gestión de rutinas
├── shared/             # Tipos y constantes compartidas
└── stores/             # Stores de Zustand (auth)

/components/ui/         # Componentes de UI de Shadcn

/hooks/                 # Hooks personalizados para fetching de datos

/lib/                   # Utilitarios y configuración
```

---

## ⚙️ Scripts Disponibles

| Script          | Descripción                                      |
| :-------------- | :----------------------------------------------- |
| `npm run dev`   | Inicia la app en modo desarrollo.                |
| `npm run build` | Compila el proyecto para producción.             |
| `npm run start` | Inicia la app en modo producción.                |
| `npm run lint`  | Analiza el código con ESLint.                    |

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENCE` para más detalles.