import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Routes, Route, Link as RouterLink, Navigate } from 'react-router-dom';
import { Navbar } from './ui/components/Navbar';
import { AppointmentsPage } from './features/appointments/ui/AppointmentsPage';
import { EmployeesPage } from './features/employees/ui/EmployeesPage';
import { CustomersPage } from './features/customers/ui/CustomersPage';
import { LoginPage } from './features/auth/ui/LoginPage';
import { ChangePasswordModal } from './features/auth/ui/ChangePasswordModal';
import { useAuth } from './features/auth/context/AuthContext';
import './App.css'

function HomePage() {
  return (
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido al Taller
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Gestiona tus citas de forma rápida y sencilla.
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        component={RouterLink} 
        to="/appointments"
        sx={{ mt: 2 }}
      >
        Ver mis Citas
      </Button>
    </Box>
  );
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <ChangePasswordModal />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <EmployeesPage />
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute allowedRoles={['ADMIN', 'BACKOFFICE']}>
              <CustomersPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Container>
    </>
  )
}

export default App
