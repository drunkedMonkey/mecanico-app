import { useState, useMemo } from 'react';
import { Box, Grid, CircularProgress, Typography, Alert, Button, ButtonGroup } from '@mui/material';
import { AppointmentCard } from './AppointmentCard';
import { useAppointments } from './useAppointments';
import { AppointmentRepository } from '../infrastructure/AppointmentRepository';
import { CreateAppointmentModal } from './CreateAppointmentModal';
import CalendarView from './CalendarView';
import { Appointment } from '../domain/Appointment';
import { useAuth } from '../../auth/context/AuthContext';

export const AppointmentsPage = () => {
  const { appointments, loading, error, refresh } = useAppointments();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<Partial<{ customerId: number; client_name: string; vehicle_plate: string; scheduled_at: string; description: string; mechanic_id: number }> | undefined>(undefined);
  const [pendingStartId, setPendingStartId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const sortedAppointments = useMemo(() => {
    let filtered = appointments;
    if (user?.role === 'MECHANIC') {
      filtered = appointments.filter(a => a.mechanicId === user.id);
    }
    return [...filtered].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  }, [appointments, user]);

  if (loading && appointments.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const canEditOrCancel = user?.role === 'ADMIN' || user?.role === 'BACKOFFICE';
  const canCreate = user?.role === 'ADMIN' || user?.role === 'BACKOFFICE';

  return (
    <Box sx={{ my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Mis Citas
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <ButtonGroup variant="outlined" aria-label="view mode">
            <Button variant={viewMode === 'list' ? 'contained' : 'outlined'} onClick={() => setViewMode('list')}>Lista</Button>
            <Button variant={viewMode === 'calendar' ? 'contained' : 'outlined'} onClick={() => setViewMode('calendar')}>Calendario</Button>
          </ButtonGroup>
          {canCreate && (
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Nueva Cita
            </Button>
          )}
        </Box>
      </Box>

      {error && (
        <Box sx={{ mb: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      
      {viewMode === 'list' ? (
        <Grid container spacing={3}>
          {sortedAppointments.map(appointment => (
            <Grid size={{ xs: 12 }} key={appointment.id}>
              <AppointmentCard
                appointment={appointment as Appointment}
                onDeletePermanently={user?.role === 'ADMIN' ? async () => {
                  try {
                    const repo = new AppointmentRepository();
                    await repo.deleteAppointmentPermanently(appointment.id as number);
                    refresh();
                  } catch (err) {
                    console.error('Error eliminando la cita permanentemente', err);
                  }
                } : undefined}
                onCancel={canEditOrCancel ? async () => {
                try {
                  const repo = new AppointmentRepository();
                  await repo.deleteAppointment(appointment.id as number);
                  refresh();
                } catch (err) {
                  console.error('Error cancelando la cita', err);
                }
              } : undefined}
              onComplete={async () => {
                try {
                  const repo = new AppointmentRepository();
                  await repo.updateAppointment(appointment.id as number, { status: 'completed' });
                  refresh();
                } catch (err) {
                  console.error('Error marcando la cita como completada', err);
                }
              }}
              onStart={async () => {
                // Open modal to edit the appointment (reschedule) and then mark as in_progress
                setPendingStartId(appointment.id as number);
                setEditingId(appointment.id as number);
                
                // propose follow-up date 24h after the original scheduled time
                const d = new Date(appointment.scheduledAt);
                d.setDate(d.getDate() + 1);
                const pad = (n: number) => String(n).padStart(2, '0');
                const scheduled_at = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                setModalInitialData({ 
                  customerId: appointment.customerId ?? undefined,
                  client_name: appointment.clientName, 
                  vehicle_plate: appointment.vehiclePlate, 
                  scheduled_at, 
                  description: appointment.description ?? '',
                  mechanic_id: appointment.mechanicId ?? undefined
                });
                setIsModalOpen(true);
              }}
              onReopen={canEditOrCancel ? async () => {
                try {
                  const repo = new AppointmentRepository();
                  await repo.updateAppointment(appointment.id as number, { status: 'scheduled' });
                  refresh();
                } catch (err) {
                  console.error('Error reabriendo la cita', err);
                }
              } : undefined}
              onEdit={canEditOrCancel ? () => {
                const d = new Date(appointment.scheduledAt);
                const pad = (n: number) => String(n).padStart(2, '0');
                const scheduled_at = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                setModalInitialData({ 
                  customerId: appointment.customerId ?? undefined,
                  client_name: appointment.clientName, 
                  vehicle_plate: appointment.vehiclePlate, 
                  scheduled_at, 
                  description: appointment.description ?? '',
                  mechanic_id: appointment.mechanicId ?? undefined
                });
                setEditingId(appointment.id as number);
                setIsModalOpen(true);
              } : undefined}
            />
          </Grid>
        ))}
      </Grid>
      ) : (
        <CalendarView appointments={sortedAppointments} onAppointmentClick={canEditOrCancel ? (a) => {
          // open modal to edit the appointment
          const d = new Date(a.scheduledAt);
          const pad = (n: number) => String(n).padStart(2, '0');
          const scheduled_at = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
          setModalInitialData({ 
            customerId: a.customerId ?? undefined,
            client_name: a.clientName, 
            vehicle_plate: a.vehiclePlate, 
            scheduled_at, 
            description: a.description ?? '',
            mechanic_id: a.mechanicId ?? undefined
          });
          setEditingId(a.id as number);
          setIsModalOpen(true);
        } : undefined} />
      )}
      <CreateAppointmentModal
        open={isModalOpen}
        onClose={() => { setIsModalOpen(false); setModalInitialData(undefined); setPendingStartId(null); setEditingId(null); }}
        appointmentId={editingId || undefined}
        onSuccess={async () => {
          try {
            // If there is a pending appointment to mark as in_progress, update it now
            if (pendingStartId) {
              const repo = new AppointmentRepository();
              await repo.updateAppointment(pendingStartId, { status: 'in_progress' });
            }
            // refresh list after creating follow-up and marking in_progress
            refresh();
          } catch (err) {
            console.error('Error al marcar la cita como en curso después de crear seguimiento', err);
          } finally {
            setModalInitialData(undefined);
            setPendingStartId(null);
            setEditingId(null);
            setIsModalOpen(false);
          }
        }}
        initialData={modalInitialData}
      />
    </Box>
  );
};
