import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  Box 
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const ChangePasswordModal = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !user.passwordChanged) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isAuthenticated, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          newPassword: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al cambiar la contraseña');
      }

      // Update local user state to reflect password change
      if (user) {
        const updatedUser = { ...user, passwordChanged: true };
        const token = localStorage.getItem('token');
        if (token) {
          login(token, updatedUser);
        }
      }
      setOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Dialog 
      open={open} 
      disableEscapeKeyDown 
      onClose={() => {}} // Prevent closing by clicking outside
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Cambiar Contraseña</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Es necesario que cambies tu contraseña antes de continuar.
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} noValidate id="change-password-form">
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nueva Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="change-password-form"
          variant="contained"
          fullWidth
        >
          Cambiar Contraseña
        </Button>
      </DialogActions>
    </Dialog>
  );
};
