import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Button, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '../../../ui/components/ConfirmDialog';
import { Appointment } from '../domain/Appointment';
import { APPOINTMENT_STATUS } from '../domain/AppointmentStatus';
import { getStatusLabel } from './statusLabels';
import { getStatusBorder } from './statusStyles';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: () => Promise<void> | (() => void);
  onComplete?: () => Promise<void> | (() => void);
  onStart?: () => Promise<void> | (() => void);
  onReopen?: () => Promise<void> | (() => void);
  onEdit?: () => void;
  onDeletePermanently?: () => Promise<void> | (() => void);
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel, onComplete, onStart, onReopen, onEdit, onDeletePermanently }) => {
  const [openCancel, setOpenCancel] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [openReopen, setOpenReopen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <Card sx={{ 
      minWidth: 275, 
      mb: 2, 
      borderLeft: `4px solid ${getStatusBorder(appointment.status)}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 4
      }
    }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {appointment.vehiclePlate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {appointment.clientName}
              </Typography>
              {appointment.mechanicName && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Mecánico: <strong>{appointment.mechanicName}</strong>
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid size="grow">
             <Typography variant="caption" display="block" color="text.secondary">
                #{appointment.id}
             </Typography>
             <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {appointment.scheduledAt.toLocaleDateString()} — {appointment.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 'auto' }} sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Chip
              label={getStatusLabel(appointment.status)}
              color={
                appointment.status === 'cancelled'
                  ? 'error'
                  : appointment.status === 'completed'
                  ? 'success'
                  : appointment.status === 'in_progress'
                  ? 'warning'
                  : 'primary'
              }
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />

            {(appointment.status === APPOINTMENT_STATUS.SCHEDULED || appointment.status === APPOINTMENT_STATUS.IN_PROGRESS) && onEdit && (
              <IconButton size="small" onClick={onEdit} aria-label="editar">
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {appointment.canBeCancelled() && (
            <>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => setOpenCancel(true)}
              >
                Cancelar
              </Button>
              <ConfirmDialog
                open={openCancel}
                title="Cancelar cita"
                description="¿Estás seguro de que quieres cancelar esta cita? Esta acción no se puede deshacer."
                confirmText="Sí, cancelar"
                cancelText="No"
                confirmColor="error"
                onConfirm={async () => {
                  if (onCancel) await onCancel();
                }}
                onClose={() => setOpenCancel(false)}
              />
            </>
          )}

            {appointment.status === APPOINTMENT_STATUS.SCHEDULED && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setOpenStart(true)}
                  sx={{ borderRadius: 20 }}
                >
                  Iniciar
                </Button>
                <ConfirmDialog
                  open={openStart}
                  title="Poner en curso"
                  description="¿Deseas marcar la cita como en curso y crear una nueva cita de seguimiento?"
                  confirmText="Sí, iniciar"
                  cancelText="No"
                  confirmColor="warning"
                  onConfirm={async () => {
                    if (typeof onStart === 'function') await onStart();
                  }}
                  onClose={() => setOpenStart(false)}
                />
              </>
            )}

          {appointment.status === APPOINTMENT_STATUS.IN_PROGRESS && (
            <>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => setOpenComplete(true)}
                sx={{ borderRadius: 20 }}
              >
                Completar
              </Button>
              <ConfirmDialog
                open={openComplete}
                title="Marcar como completada"
                description="¿Confirmas que la cita está completada?"
                confirmText="Sí, completar"
                cancelText="No"
                confirmColor="success"
                onConfirm={async () => {
                  if (onComplete) await onComplete();
                }}
                onClose={() => setOpenComplete(false)}
              />
            </>
          )}
          {/* Allow reopening a completed appointment if the scheduled day hasn't passed (ignore time) */}
          {appointment.status === APPOINTMENT_STATUS.COMPLETED && (() => {
            const scheduled = new Date(appointment.scheduledAt);
            const today = new Date();
            const scheduledNum = scheduled.getFullYear() * 10000 + (scheduled.getMonth() + 1) * 100 + scheduled.getDate();
            const todayNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
            if (scheduledNum >= todayNum) {
              return (
                <>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    onClick={() => setOpenReopen(true)}
                  >
                    Reabrir
                  </Button>
                  <ConfirmDialog
                    open={openReopen}
                    title="Reabrir cita"
                    description="¿Deseas devolver esta cita al estado de citada?"
                    confirmText="Sí, reabrir"
                    cancelText="No"
                    confirmColor="info"
                    onConfirm={async () => {
                      if (onReopen) await onReopen();
                    }}
                    onClose={() => setOpenReopen(false)}
                  />
                </>
              );
            }
            return null;
          })()}
          
          {onDeletePermanently && (
            <>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setOpenDelete(true)}
                sx={{ ml: 1 }}
              >
                Eliminar Definitivamente
              </Button>
              <ConfirmDialog
                open={openDelete}
                title="Eliminar definitivamente"
                description="Esta acción no se puede deshacer. ¿Estás seguro?"
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
                confirmColor="error"
                onConfirm={async () => {
                  if (onDeletePermanently) await onDeletePermanently();
                }}
                onClose={() => setOpenDelete(false)}
              />
            </>
          )}
        </Box>

        {appointment.description && (
          <Box sx={{ mt: 2, p: 1.5, bgcolor: 'background.default', borderRadius: 1, border: '1px dashed', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 600, mb: 0.5 }}>
              Nota:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {appointment.description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
