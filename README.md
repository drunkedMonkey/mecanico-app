# Mechanic App

Comprehensive management system for mechanical workshops. This application allows managing appointments, customers, vehicles, and employees, with a role-based access control (RBAC) system.

## Project Structure

The project is divided into two main folders:

- **`backend`**: REST API built with Node.js, Express, TypeScript, and Prisma (PostgreSQL).
- **`frontend`**: User interface built with React, Vite, and Material UI.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (Local or remote database)

## Installation and Setup

Follow these steps to run the project in your local environment.

### 1. Clone the repository

```bash
git clone <repository-url>
cd mecanico-app
```

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file and ensure the `DATABASE_URL` variable points to your local PostgreSQL database.
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mecanico_db"
    ```

4.  Initialize the database:
    Run migrations to create the tables:
    ```bash
    npm run prisma:migrate
    ```

5.  (Optional) Load test data:
    Populate the database with initial users and data:
    ```bash
    npm run seed
    ```

6.  Start the development server:
    ```bash
    npm run dev
    ```
    The backend will be running at `http://localhost:8000`.

### 3. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or the port indicated by Vite).

## Test Credentials

If you ran the `npm run seed` command, you can use the following users to test the different roles:

| Role | Email | Password |
| --- | --- | --- |
| **Admin** | `admin@taller.com` | `123456` |
| **Mechanic** | `juan.perez@taller.com` | `123456` |
| **Backoffice** | `backoffice@taller.com` | `123456` |

> **Note**: Upon logging in for the first time, you will be asked to change the password.

## User Creation

The application does not have a public registration. User management is exclusive to the **Administrator** role.

1.  Log in with an Administrator account.
2.  Go to the **Employees** section.
3.  Click on **New Employee**.
4.  Fill in the data and select the role.
5.  **Important**: The initial default password will be `123456`. The user must change it on their first access.

## Main Features

- **Appointment Management**: Create, edit, cancel, and complete appointments. Calendar and list view.
- **Customer Management**: Complete CRUD of customers and their associated vehicles.
- **Employee Management**: Personnel administration with differentiated roles.
- **Security**: JWT authentication and role-based authorization (Admin, Mechanic, Backoffice).
- **Permanent Deletion**: Exclusive functionality for administrators to permanently delete records.

## Technologies

- **Frontend**: React, TypeScript, Vite, Material UI, React Query.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL.
