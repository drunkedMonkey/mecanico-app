import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Stack,
  Grid,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { EmployeeRepository } from '../infrastructure/EmployeeRepository';
import type { Employee } from '../domain/Employee';

interface CreateEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  employeeToEdit?: Employee | null;
}

function validateDocument(type: 'DNI' | 'NIE', value: string): boolean {
  const validChars = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
  const str = value.toString().toUpperCase();

  if (type === 'DNI' && !nifRexp.test(str)) return false;
  if (type === 'NIE' && !nieRexp.test(str)) return false;

  const nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  const letter = str.substr(-1);
  const charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone);
}

export const CreateEmployeeModal = ({ open, onClose, onSuccess, employeeToEdit }: CreateEmployeeModalProps) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [documentType, setDocumentType] = useState<'DNI' | 'NIE'>('DNI');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'MECHANIC' | 'ADMIN' | 'BACKOFFICE'>('MECHANIC');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  useEffect(() => {
    if (open) {
      if (employeeToEdit) {
        setFirstName(employeeToEdit.firstName || '');
        setFirstSurname(employeeToEdit.firstSurname || '');
        setSecondSurname(employeeToEdit.secondSurname || '');
        const doc = employeeToEdit.dni || '';
        setDni(doc);
        if (/^[XYZ]/i.test(doc)) {
          setDocumentType('NIE');
        } else {
          setDocumentType('DNI');
        }
        setEmail(employeeToEdit.email || '');
        setPhone(employeeToEdit.phone || '');
        setRole(employeeToEdit.role || 'MECHANIC');
      } else {
        setFirstName('');
        setFirstSurname('');
        setSecondSurname('');
        setDni('');
        setDocumentType('DNI');
        setEmail('');
        setPhone('');
        setRole('MECHANIC');
      }
      setErrors({});
    }
  }, [open, employeeToEdit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dni) {
        if (!validateDocument(documentType, dni)) {
          setErrors(prev => ({ ...prev, dni: `El ${documentType} no es válido` }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.dni;
            return newErrors;
          });
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.dni;
          return newErrors;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [dni, documentType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) {
        if (!validateEmail(email)) {
          setErrors(prev => ({ ...prev, email: 'El email no es válido' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.email;
            return newErrors;
          });
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phone) {
        if (!validatePhone(phone)) {
          setErrors(prev => ({ ...prev, phone: 'El teléfono debe tener 9 dígitos' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.phone;
            return newErrors;
          });
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.phone;
          return newErrors;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!firstName) newErrors.firstName = 'El nombre es obligatorio';
    if (!firstSurname) newErrors.firstSurname = 'El primer apellido es obligatorio';
    if (!dni) {
      newErrors.dni = 'El identificador es obligatorio';
    } else if (!validateDocument(documentType, dni)) {
      newErrors.dni = `El ${documentType} no es válido`;
    }
    if (!email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!phone) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const repository = new EmployeeRepository();
      const fullName = `${firstName} ${firstSurname} ${secondSurname || ''}`.trim();
      const data = {
        name: fullName,
        firstName,
        firstSurname,
        secondSurname,
        dni,
        email,
        phone,
        role
      };

      if (employeeToEdit) {
        await repository.updateEmployee(employeeToEdit.id, data);
      } else {
        await repository.createEmployee(data);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error.message || 'Error al guardar el empleado',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{employeeToEdit ? 'Editar Empleado' : 'Nuevo Empleado'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
            <TextField
              autoFocus
              label="Nombre"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Primer Apellido"
                  fullWidth
                  value={firstSurname}
                  onChange={(e) => setFirstSurname(e.target.value)}
                  error={!!errors.firstSurname}
                  helperText={errors.firstSurname}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label="Segundo Apellido"
                  fullWidth
                  value={secondSurname}
                  onChange={(e) => setSecondSurname(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 4 }}>
                <TextField
                  select
                  label="Tipo"
                  fullWidth
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value as 'DNI' | 'NIE')}
                >
                  <MenuItem value="DNI">DNI</MenuItem>
                  <MenuItem value="NIE">NIE</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 8 }}>
                <TextField
                  label="Identificador"
                  placeholder="Identificador"
                  fullWidth
                  value={dni}
                  onChange={(e) => setDni(e.target.value.toUpperCase())}
                  error={!!errors.dni}
                  helperText={errors.dni}
                />
              </Grid>
            </Grid>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Teléfono"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\s/g, ''))}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              select
              label="Rol"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value as 'MECHANIC' | 'ADMIN' | 'BACKOFFICE')}
            >
              <MenuItem value="MECHANIC">Mecánico</MenuItem>
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="BACKOFFICE">Backoffice</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
    </>
  );
};
