# Backend - Mecánico App

Este es el backend de la aplicación de gestión de talleres mecánicos, una API REST construida con Node.js, Express, TypeScript y Prisma.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/) (Base de datos local o remota)

## Instalación

1.  Navega al directorio del backend (si no estás ya ahí):
    ```bash
    cd backend
    ```

2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

## Configuración

1.  Copia el archivo de ejemplo de variables de entorno:
    ```bash
    cp .env.example .env
    ```

2.  Edita el archivo `.env` y configura la variable `DATABASE_URL` con la conexión a tu base de datos PostgreSQL:
    ```env
    DATABASE_URL="postgresql://usuario:password@localhost:5432/mecanico_db"
    ```

## Base de Datos

1.  Ejecuta las migraciones para crear las tablas en la base de datos:
    ```bash
    npm run prisma:migrate
    ```

2.  (Opcional) Puebla la base de datos con datos de prueba (usuarios, roles, etc.):
    ```bash
    npm run seed
    ```

## Scripts Disponibles

### Servidor de Desarrollo

Para iniciar el servidor en modo de desarrollo con recarga automática:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:8000`.

### Construcción y Producción

Para compilar el proyecto a JavaScript:

```bash
npm run build
```

Para iniciar el servidor compilado (producción):

```bash
npm start
```

### Mantenimiento

Para ejecutar el script de mantenimiento diario (ej. actualizar estados de citas):

```bash
npm run daily:appointments
```

## Estructura de Carpetas

- `src/features`: Lógica de negocio agrupada por dominios (auth, appointments, customers, employees).
- `src/shared`: Código compartido, configuración del bus de eventos, utilidades.
- `src/server.ts`: Punto de entrada de la aplicación.
