import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Stack,
  MenuItem,
  Typography
} from '@mui/material';
import { AppointmentRepository } from '../infrastructure/AppointmentRepository';
import { EmployeeRepository } from '../../employees/infrastructure/EmployeeRepository';
import type { Employee } from '../../employees/domain/Employee';
import { CustomerRepository } from '../../customers/infrastructure/CustomerRepository';
import type { Customer } from '../../customers/domain/Customer';

interface CreateAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Partial<{ customerId: number; client_name: string; vehicle_plate: string; scheduled_at: string; description: string; mechanic_id: number }>;
  appointmentId?: number;
}

export const CreateAppointmentModal = ({ open, onClose, onSuccess, initialData, appointmentId }: CreateAppointmentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState({
    customerId: '' as string | number,
    client_name: '',
    vehicle_plate: '',
    scheduled_at: '',
    description: '',
    mechanic_id: '' as string | number,
  });

  const selectedCustomer = customers.find(c => c.id === Number(formData.customerId));
  const customerVehicles = selectedCustomer?.vehicles || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRepo = new EmployeeRepository();
        const empData = await empRepo.getEmployees();
        // Filter only active employees with MECHANIC role
        const activeEmployees = empData.filter(e => !e.deletedAt && e.role === 'MECHANIC');
        setEmployees(activeEmployees);

        const custRepo = new CustomerRepository();
        const custData = await custRepo.getCustomers();
        setCustomers(custData);

        // Auto-assign mechanic for new appointments
        if (!appointmentId && (!initialData || !initialData.mechanic_id)) {
          const appRepo = new AppointmentRepository();
          const appointments = await appRepo.getAppointments();
          
          const mechanicCounts = new Map<number, number>();
          activeEmployees.forEach(emp => mechanicCounts.set(emp.id, 0));
          
          appointments.forEach(app => {
            if (app.mechanicId && mechanicCounts.has(app.mechanicId)) {
              mechanicCounts.set(app.mechanicId, mechanicCounts.get(app.mechanicId)! + 1);
            }
          });

          let minCount = Infinity;
          for (const count of mechanicCounts.values()) {
            if (count < minCount) minCount = count;
          }

          const candidates = activeEmployees.filter(emp => mechanicCounts.get(emp.id) === minCount);
          
          if (candidates.length > 0) {
            const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];
            setFormData(prev => ({ ...prev, mechanic_id: randomCandidate.id }));
          }
        }
      } catch (err) {
        console.error('Error loading data', err);
      }
    };
    if (open) {
      fetchData();
    }
  }, [open]);

  // Prefill form when modal opens with initialData
  useEffect(() => {
    if (open && initialData) {
      setFormData((prev) => ({ 
        ...prev, 
        ...initialData,
        mechanic_id: initialData.mechanic_id || '',
        customerId: initialData.customerId || '',
        client_name: initialData.client_name || '',
        vehicle_plate: initialData.vehicle_plate || '',
        scheduled_at: initialData.scheduled_at || '',
        description: initialData.description || ''
      }));
    } else if (open && !initialData) {
      // Reset if opening fresh
      setFormData({ customerId: '', client_name: '', vehicle_plate: '', scheduled_at: '', description: '', mechanic_id: '' });
    }
  }, [open, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const repository = new AppointmentRepository();
      const dataToSend = {
        ...formData,
        customerId: formData.customerId ? Number(formData.customerId) : undefined,
        mechanic_id: formData.mechanic_id ? Number(formData.mechanic_id) : undefined
      };

      if (appointmentId) {
        await repository.updateAppointment(appointmentId, dataToSend);
      } else {
        await repository.createAppointment(dataToSend);
      }
      onSuccess();
      onClose();
      // Reset form
      setFormData({ customerId: '', client_name: '', vehicle_plate: '', scheduled_at: '', description: '', mechanic_id: '' });
    } catch (error) {
      console.error(error);
      alert(appointmentId ? 'Error al actualizar la cita' : 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{appointmentId ? 'Editar Cita' : 'Nueva Cita'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              select
              label="Cliente"
              fullWidth
              required
              value={formData.customerId}
              onChange={(e) => {
                const selectedId = Number(e.target.value);
                const selectedCustomer = customers.find(c => c.id === selectedId);
                setFormData({ 
                  ...formData, 
                  customerId: selectedId,
                  client_name: selectedCustomer ? selectedCustomer.name : '' 
                });
              }}
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name} {customer.identifier ? `(${customer.identifier})` : ''}
                </MenuItem>
              ))}
            </TextField>

            {selectedCustomer && customerVehicles.length > 0 && (
              <TextField
                select
                label="Seleccionar Vehículo"
                fullWidth
                value={customerVehicles.some(v => v.plate === formData.vehicle_plate) ? formData.vehicle_plate : ''}
                onChange={(e) => setFormData({ ...formData, vehicle_plate: e.target.value })}
              >
                {customerVehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.plate}>
                    {vehicle.brand} {vehicle.model} - {vehicle.plate}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {selectedCustomer && customerVehicles.length === 0 && (
              <Typography color="error" variant="body2">
                Este cliente no tiene vehículos registrados.
              </Typography>
            )}

            {formData.vehicle_plate && (
              <TextField
                label="Matrícula del Vehículo"
                fullWidth
                required
                value={formData.vehicle_plate}
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
            <TextField
              select
              label="Mecánico Asignado"
              fullWidth
              required
              value={formData.mechanic_id}
              onChange={(e) => setFormData({ ...formData, mechanic_id: e.target.value })}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Fecha y Hora"
              type="datetime-local"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={formData.scheduled_at}
              onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
            />
            <TextField
              label="Descripción del Problema"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? (appointmentId ? 'Guardando...' : 'Creando...') : (appointmentId ? 'Guardar Cambios' : 'Crear Cita')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
