# Backend - Mechanic App

This is the backend for the mechanical workshop management application, a REST API built with Node.js, Express, TypeScript, and Prisma.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Local or remote database)

## Installation

1.  Navigate to the backend directory (if you are not already there):
    ```bash
    cd backend
    ```

2.  Install project dependencies:
    ```bash
    npm install
    ```

## Configuration

1.  Copy the environment variables example file:
    ```bash
    cp .env.example .env
    ```

2.  Edit the `.env` file and configure the `DATABASE_URL` variable with your PostgreSQL database connection string:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mecanico_db"
    ```

## Database

1.  Run migrations to create tables in the database:
    ```bash
    npm run prisma:migrate
    ```

2.  (Optional) Populate the database with test data (users, roles, etc.):
    ```bash
    npm run seed
    ```

## Available Scripts

### Development Server

To start the server in development mode with auto-reload:

```bash
npm run dev
```

The server will start at `http://localhost:8000`.

### Build and Production

To compile the project to JavaScript:

```bash
npm run build
```

To start the compiled server (production):

```bash
npm start
```

### Maintenance

To run the daily maintenance script (e.g., update appointment statuses):

```bash
npm run daily:appointments
```

## Folder Structure

- `src/features`: Business logic grouped by domains (auth, appointments, customers, employees).
- `src/shared`: Shared code, event bus configuration, utilities.
- `src/server.ts`: Application entry point.
