import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem, Typography, List, ListItem, ListItemText, IconButton, Box, CircularProgress, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { CustomerRepository } from '../infrastructure/CustomerRepository';
import type { Customer } from '../domain/Customer';
import VehicleService from '../../../shared/services/VehicleService';
import type { Make, Model } from '../../../shared/services/VehicleService';

interface CreateCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customerToEdit?: Customer | null;
}

function validateDocument(type: string, value: string): boolean {
  if (type === 'PASSPORT') return true; // No validation for passport
  
  const str = value.toString().toUpperCase();
  
  if (type === 'NIF') {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    const nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    const letter = str.substr(-1);
    const charIndex = parseInt(nie.substr(0, 8)) % 23;

    return validChars.charAt(charIndex) === letter;
  }

  if (type === 'CIF') {
    const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;
    return cifRegex.test(str);
  }

  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone);
}

export const CreateCustomerModal = ({ open, onClose, onSuccess, customerToEdit }: CreateCustomerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<{
    name: string;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    identifier: string;
    identifierType: 'NIF' | 'CIF' | 'PASSPORT';
    address: string;
    email: string;
    phone: string;
  }>({
    name: '',
    firstName: '',
    firstSurname: '',
    secondSurname: '',
    identifier: '',
    identifierType: 'NIF',
    address: '',
    email: '',
    phone: '',
  });

  // Vehicle State
  const [vehicles, setVehicles] = useState<{ id: number; brand: string; model: string; plate: string }[]>([]);
  const [makes, setMakes] = useState<Make[]>([]);
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [newVehicle, setNewVehicle] = useState({ brand: '', model: '', plate: '' });
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        name: customerToEdit.name || '',
        firstName: customerToEdit.firstName || '',
        firstSurname: customerToEdit.firstSurname || '',
        secondSurname: customerToEdit.secondSurname || '',
        identifier: customerToEdit.identifier || '',
        identifierType: customerToEdit.identifierType || 'NIF',
        address: customerToEdit.address || '',
        email: customerToEdit.email || '',
        phone: customerToEdit.phone || '',
      });
      setVehicles(customerToEdit.vehicles || []);
    } else {
      setFormData({
        name: '',
        firstName: '',
        firstSurname: '',
        secondSurname: '',
        identifier: '',
        identifierType: 'NIF',
        address: '',
        email: '',
        phone: '',
      });
      setVehicles([]);
    }
    setErrors({});
    setIsAddingVehicle(false);
    setNewVehicle({ brand: '', model: '', plate: '' });
  }, [customerToEdit, open]);

  // Load Makes
  useEffect(() => {
    if (open) {
      setLoadingMakes(true);
      VehicleService.getMakes().then(data => {
        setMakes(data);
        setLoadingMakes(false);
      });
    }
  }, [open]);

  // Load Models when Brand changes
  useEffect(() => {
    if (newVehicle.brand) {
      const selectedMake = makes.find(m => m.Make_Name === newVehicle.brand);
      if (selectedMake) {
        setLoadingModels(true);
        VehicleService.getModelsForMakeId(selectedMake.Make_ID).then(data => {
          setModels(data);
          setLoadingModels(false);
        });
      }
    } else {
      setModels([]);
    }
  }, [newVehicle.brand, makes]);

  const handleAddVehicle = async () => {
    if (!newVehicle.brand || !newVehicle.model || !newVehicle.plate) return;
    
    if (customerToEdit) {
      try {
        const repo = new CustomerRepository();
        const addedVehicle = await repo.addVehicle(customerToEdit.id, newVehicle);
        setVehicles([...vehicles, addedVehicle]);
        setNewVehicle({ brand: '', model: '', plate: '' });
        setIsAddingVehicle(false);
      } catch (error) {
        console.error(error);
        alert('Error al añadir vehículo');
      }
    } else {
      // Local state for new customer
      const tempId = Date.now(); // Temporary ID
      setVehicles([...vehicles, { ...newVehicle, id: tempId }]);
      setNewVehicle({ brand: '', model: '', plate: '' });
      setIsAddingVehicle(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId: number) => {
    if (customerToEdit) {
      try {
        const repo = new CustomerRepository();
        await repo.deleteVehicle(customerToEdit.id, vehicleId);
        setVehicles(vehicles.filter(v => v.id !== vehicleId));
      } catch (error) {
        console.error(error);
        alert('Error al eliminar vehículo');
      }
    } else {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
    }
  };

  // Real-time validation with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.identifier) {
        if (!validateDocument(formData.identifierType, formData.identifier)) {
          setErrors(prev => ({ ...prev, identifier: `El ${formData.identifierType} no es válido` }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.identifier;
            return newErrors;
          });
        }
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.identifier;
          return newErrors;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.identifier, formData.identifierType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email) {
        if (!validateEmail(formData.email)) {
          setErrors(prev => ({ ...prev, email: 'El formato del email no es válido' }));
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
  }, [formData.email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.phone) {
        if (!validatePhone(formData.phone)) {
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
  }, [formData.phone]);

  // Clear errors for required text fields
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (formData.firstName) delete newErrors.firstName;
        if (formData.firstSurname) delete newErrors.firstSurname;
        if (formData.secondSurname) delete newErrors.secondSurname;
        if (formData.address) delete newErrors.address;
        
        // Clear contact error if either email or phone is present
        if (formData.email || formData.phone) delete newErrors.contact;
        
        return newErrors;
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.firstName, formData.firstSurname, formData.secondSurname, formData.address, formData.email, formData.phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation check
    const currentErrors: Record<string, string> = {};
    
    if (!formData.firstName) currentErrors.firstName = 'El nombre es obligatorio';
    if (!formData.firstSurname) currentErrors.firstSurname = 'El primer apellido es obligatorio';
    if (!formData.secondSurname) currentErrors.secondSurname = 'El segundo apellido es obligatorio';
    if (!formData.identifier) currentErrors.identifier = 'El identificador es obligatorio';
    if (!formData.address) currentErrors.address = 'La dirección es obligatoria';
    
    if (!formData.email && !formData.phone) {
      currentErrors.contact = 'Debe proporcionar al menos un email o teléfono';
    }

    if (formData.identifier && !validateDocument(formData.identifierType, formData.identifier)) {
      currentErrors.identifier = `El ${formData.identifierType} no es válido`;
    }
    if (formData.email && !validateEmail(formData.email)) {
      currentErrors.email = 'El formato del email no es válido';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      currentErrors.phone = 'El teléfono debe tener 9 dígitos';
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setLoading(true);
    
    try {
      const repo = new CustomerRepository();
      // Construct full name if needed, or just send fields. 
      // Backend expects 'name' as mandatory. We can auto-generate it from parts if empty, or ask user.
      // Assuming 'name' field is still used as Display Name or Full Name.
      const payload = {
        ...formData,
        name: `${formData.firstName} ${formData.firstSurname} ${formData.secondSurname}`.trim(),
        vehicles: customerToEdit ? undefined : vehicles.map(v => ({ brand: v.brand, model: v.model, plate: v.plate }))
      };

      if (customerToEdit) {
        await repo.updateCustomer(customerToEdit.id, payload);
      } else {
        await repo.createCustomer(payload);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error al guardar el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{customerToEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Nombre"
                fullWidth
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="Primer Apellido"
                fullWidth
                value={formData.firstSurname}
                onChange={(e) => setFormData({ ...formData, firstSurname: e.target.value })}
                error={!!errors.firstSurname}
                helperText={errors.firstSurname}
              />
              <TextField
                label="Segundo Apellido"
                fullWidth
                value={formData.secondSurname}
                onChange={(e) => setFormData({ ...formData, secondSurname: e.target.value })}
                error={!!errors.secondSurname}
                helperText={errors.secondSurname}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                label="Tipo ID"
                value={formData.identifierType}
                onChange={(e) => setFormData({ ...formData, identifierType: e.target.value as 'NIF' | 'CIF' | 'PASSPORT' })}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="NIF">NIF</MenuItem>
                <MenuItem value="CIF">CIF</MenuItem>
                <MenuItem value="PASSPORT">Pasaporte</MenuItem>
              </TextField>
              <TextField
                label="Identificador"
                fullWidth
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value.toUpperCase() })}
                error={!!errors.identifier}
                helperText={errors.identifier}
              />
            </Stack>

            <TextField
              label="Dirección Completa"
              fullWidth
              multiline
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={!!errors.address}
              helperText={errors.address}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email || !!errors.contact}
                helperText={errors.email || (errors.contact && !formData.phone ? errors.contact : '')}
              />
              <TextField
                label="Teléfono"
                fullWidth
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\s/g, '') })}
                error={!!errors.phone || !!errors.contact}
                helperText={errors.phone || (errors.contact && !formData.email ? errors.contact : '')}
              />
            </Stack>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>Vehículos</Typography>
              <List dense>
                {vehicles.map(vehicle => (
                  <ListItem key={vehicle.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteVehicle(vehicle.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${vehicle.brand} ${vehicle.model}`}
                      secondary={`Matrícula: ${vehicle.plate}`}
                    />
                  </ListItem>
                ))}
              </List>

              {isAddingVehicle ? (
                <Stack spacing={2} sx={{ mt: 1, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Autocomplete
                    options={makes}
                    getOptionLabel={(option) => option.Make_Name}
                    loading={loadingMakes}
                    value={makes.find(m => m.Make_Name === newVehicle.brand) || null}
                    onChange={(_, newValue) => {
                      setNewVehicle({ ...newVehicle, brand: newValue ? newValue.Make_Name : '', model: '' });
                    }}
                    isOptionEqualToValue={(option, value) => option.Make_Name === value.Make_Name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Marca"
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingMakes ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                  <Autocomplete
                    options={models}
                    getOptionLabel={(option) => option.Model_Name}
                    loading={loadingModels}
                    disabled={!newVehicle.brand}
                    value={models.find(m => m.Model_Name === newVehicle.model) || null}
                    onChange={(_, newValue) => {
                      setNewVehicle({ ...newVehicle, model: newValue ? newValue.Model_Name : '' });
                    }}
                    isOptionEqualToValue={(option, value) => option.Model_Name === value.Model_Name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Modelo"
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingModels ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                  <TextField
                    label="Matrícula"
                    fullWidth
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value.toUpperCase() })}
                  />
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button onClick={() => setIsAddingVehicle(false)}>Cancelar</Button>
                    <Button 
                      variant="contained" 
                      onClick={handleAddVehicle}
                      disabled={!newVehicle.brand || !newVehicle.model || !newVehicle.plate}
                    >
                      Añadir
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <Button startIcon={<AddIcon />} onClick={() => setIsAddingVehicle(true)}>
                  Añadir Vehículo
                </Button>
              )}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
