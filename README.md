# Mecánico App

Sistema de gestión integral para talleres mecánicos. Esta aplicación permite administrar citas, clientes, vehículos y empleados, con un sistema de control de acceso basado en roles (RBAC).

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

- **`backend`**: API REST construida con Node.js, Express, TypeScript y Prisma (PostgreSQL).
- **`frontend`**: Interfaz de usuario construida con React, Vite y Material UI.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [PostgreSQL](https://www.postgresql.org/) (Base de datos local o remota)

## Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd mecanico-app
```

### 2. Configuración del Backend

1.  Navega al directorio del backend:
    ```bash
    cd backend
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Configura las variables de entorno:
    Copia el archivo `.env.example` a `.env`:
    ```bash
    cp .env.example .env
    ```
    Edita el archivo `.env` y asegúrate de que la variable `DATABASE_URL` apunte a tu base de datos PostgreSQL local.
    ```env
    DATABASE_URL="postgresql://usuario:password@localhost:5432/mecanico_db"
    ```

4.  Inicializa la base de datos:
    Ejecuta las migraciones para crear las tablas:
    ```bash
    npm run prisma:migrate
    ```

5.  (Opcional) Carga datos de prueba:
    Puebla la base de datos con usuarios y datos iniciales:
    ```bash
    npm run seed
    ```

6.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El backend estará corriendo en `http://localhost:8000`.

### 3. Configuración del Frontend

1.  Abre una nueva terminal y navega al directorio del frontend:
    ```bash
    cd frontend
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El frontend estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Credenciales de Prueba

Si ejecutaste el comando `npm run seed`, puedes utilizar los siguientes usuarios para probar los diferentes roles:

| Rol | Email | Contraseña |
| --- | --- | --- |
| **Admin** | `admin@taller.com` | `123456` |
| **Mecánico** | `juan.perez@taller.com` | `123456` |
| **Backoffice** | `backoffice@taller.com` | `123456` |

> **Nota**: Al iniciar sesión por primera vez, se te pedirá cambiar la contraseña.

## Creación de Usuarios

La aplicación no cuenta con un registro público. La gestión de usuarios es exclusiva del rol **Administrador**.

1.  Inicia sesión con una cuenta de Administrador.
2.  Ve a la sección **Empleados**.
3.  Haz clic en **Nuevo Empleado**.
4.  Rellena los datos y selecciona el rol.
5.  **Importante**: La contraseña inicial por defecto será `123456`. El usuario deberá cambiarla obligatoriamente en su primer acceso.

## Características Principales

- **Gestión de Citas**: Crear, editar, cancelar y completar citas. Vista de calendario y lista.
- **Gestión de Clientes**: CRUD completo de clientes y sus vehículos asociados.
- **Gestión de Empleados**: Administración de personal con roles diferenciados.
- **Seguridad**: Autenticación JWT y autorización basada en roles (Admin, Mecánico, Backoffice).
- **Eliminación Definitiva**: Funcionalidad exclusiva para administradores para borrar registros permanentemente.

## Tecnologías

- **Frontend**: React, TypeScript, Vite, Material UI, React Query.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL.
