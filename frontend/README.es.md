# Frontend - Mecánico App

Este es el frontend de la aplicación de gestión de talleres mecánicos, construido con React, TypeScript y Vite. Utiliza Material UI para la interfaz de usuario.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- El backend debe estar ejecutándose en `http://localhost:8000` para que las peticiones a la API funcionen correctamente.

## Instalación

1.  Navega al directorio del frontend (si no estás ya ahí):
    ```bash
    cd frontend
    ```

2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Scripts Disponibles

### Servidor de Desarrollo

Para iniciar la aplicación en modo de desarrollo con recarga en caliente (HMR):

```bash
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`.

### Construcción para Producción

Para compilar la aplicación para producción:

```bash
npm run build
```

Esto generará los archivos estáticos optimizados en la carpeta `dist`.

### Previsualización de Producción

Para previsualizar localmente la build de producción:

```bash
npm run preview
```

### Linting

Para ejecutar el linter y buscar errores de código:

```bash
npm run lint
```

## Estructura de Carpetas

- `src/features`: Contiene la lógica de negocio agrupada por dominios (auth, appointments, customers, employees).
- `src/ui`: Componentes de UI reutilizables y layout general.
- `src/App.tsx`: Componente raíz y configuración de rutas.
